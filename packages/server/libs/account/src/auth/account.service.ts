import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthAccount } from "./account.entity";
import { Redlock } from "@easy-kit/public/redlock.decorator";
import { ACCOUNT_LOCK_KEY, LOCK_TIME } from "./account.const";
import { Result } from "@easy-kit/public/result.entity";
import {
    ResetPasswordRequest,
    SetPasswordRequest,
    TokenOptions,
    TokenResult
} from "@easy-kit/account/auth/account.interface";
import {aesDecrypt, aesEncrypt, decrypt} from "@easy-kit/common/utils/crypto";
import { ConfigService } from "@nestjs/config";
import {TokenService} from "@easy-kit/public/token.service";
import {AuthConfig} from "@easy-kit/config/interface";
import {I18nService} from "@easy-kit/public/i18n.service";
import { OTPService } from "@easy-kit/public/otp.service";
import { OTPResult } from "@easy-kit/public/public.interface";

@Injectable()
export class AuthAccountService {
    private logger = new Logger(AuthAccountService.name);

    constructor(
        @InjectRepository(AuthAccount) private repository: Repository<AuthAccount>,
        private i18n: I18nService,
        private configService: ConfigService,
        private tokenService: TokenService,
        private otpService: OTPService,
    ) {}

    @Redlock([ACCOUNT_LOCK_KEY], LOCK_TIME)
    async add(account: AuthAccount): Promise<AuthAccount> {
        account.createTime = new Date();
        await this.repository.insert(account);
        return this.repository.findOneBy({ username: account.username });
    }

    async findByUsername(username: string): Promise<AuthAccount> {
        return await this.repository.findOneBy({ username });
    }

    async createToken(account: AuthAccount, options: TokenOptions): Promise<TokenResult> {
        const payload = { sub: account.id, username: account.username };
        return this.tokenService.create(payload, options);
    }

    async otpSecret(id: number): Promise<OTPResult|Result<any>> {
        const account = await this.repository.findOneBy({ id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const otp = await this.otpService.generate(account.username);
        if(account.otpSecret) {
            if(account.otpStatus === 1) {
                return Result.error({code: 1, message: this.i18n.t("account.otp.is_bind")} );
            }
        }else{
            account.otpSecret = otp.secret;
            await this.repository.createQueryBuilder()
                .update()
                .set({
                    otpSecret: account.otpSecret,
                    otpStatus: 0
                })
                .where("id = :id", { id })
                .execute();
        }
        return otp;
    }

    async setPassword(request: SetPasswordRequest): Promise<TokenResult|Result<any>> {
        const account = await this.repository.findOneBy({ id: request.id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const verified = this.otpService.verify({
            secret: account.otpSecret,
            token: request.otpCode
        });
        if(!verified) {
            return Result.error({code: 2, message: this.i18n.t("account.otp.verify")} );
        }
        const authConfig = this.configService.get<AuthConfig>("auth");
        const password = aesEncrypt(decrypt(request.password, authConfig.transport.privateKey), authConfig.aesKey)
        await this.repository.createQueryBuilder()
            .update()
            .set({
                password,
                otpStatus: 1,
                status: 1
            })
            .where("id = :id", { id: request.id })
            .execute();
        return await this.createToken(account, {expiresIn: "1d"});
    }

    async resetPassword(request: ResetPasswordRequest): Promise<TokenResult|Result<any>> {
        const account = await this.repository.findOneBy({ id: request.id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const authConfig = this.configService.get<AuthConfig>("auth");
        const password = aesEncrypt(decrypt(request.password, authConfig.transport.privateKey), authConfig.aesKey)
        await this.repository.createQueryBuilder()
            .update()
            .set({ password })
            .where("id = :id", { id: request.id })
            .execute();
        return await this.createToken(account, {expiresIn: "1d"});
    }

    async login(account: string, password: string): Promise<Result<TokenResult>> {
        const authConfig = this.configService.get<AuthConfig>("auth");
        const pwd = decrypt(password, authConfig.transport.privateKey);
        const info = await this.repository.findOneBy({
            username: account
        })
        if(!info) {
            return Result.error({code: 1, message: this.i18n.t("account.login.error")} );
        }
        if(pwd !== aesDecrypt(info.password, authConfig.aesKey)) {
            return Result.error({code: 1, message: this.i18n.t("account.login.error")} );
        }
        const token = await this.createToken(info, {expiresIn: "1d"});
        return Result.success({data: token});
    }

    async findById(id: number): Promise<AuthAccount> {
        return await this.repository.findOneBy({ id });
    }
}
