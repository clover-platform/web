import {Inject, Injectable, Logger} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {AuthAccount, AuthAccountRole} from "./account.entity";
import { Redlock } from "@easy-kit/public/redlock.decorator";
import { ACCOUNT_LOCK_KEY, LOCK_TIME } from "./account.const";
import { Result } from "@easy-kit/public/result.entity";
import {
    AccountPasswordDTO,
    ResetPasswordRequest,
    SetPasswordRequest,
    TokenOptions,
    TokenResult
} from "@easy-kit/account/auth/account.interface";
import {aesDecrypt, aesEncrypt, decrypt} from "@easy-kit/common/utils/crypto";
import { ConfigService } from "@nestjs/config";
import {TokenService} from "@easy-kit/public/token.service";
import {AuthConfig, EmailConfig} from "@easy-kit/config/interface";
import {I18nService} from "@easy-kit/public/i18n.service";
import { OTPService } from "@easy-kit/public/otp.service";
import { OTPResult } from "@easy-kit/public/public.interface";
import {AccessRole, AccessRoleAuthority} from "@easy-kit/account/access/role.entity";
import {AccessRoleService} from "@easy-kit/account/access/role.service";
import {AccessAuthority, AccessAuthorityApi} from "@easy-kit/account/access/authority.entity";
import {AccessApi} from "@easy-kit/account/access/api.entity";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import ms from "ms";
import {AccessAuthorityService} from "@easy-kit/account/access/authority.service";
import {AuthorityTree} from "@easy-kit/account/access/access.interface";

@Injectable()
export class AuthAccountService {
    private logger = new Logger(AuthAccountService.name);

    constructor(
        @InjectRepository(AuthAccount) private repository: Repository<AuthAccount>,
        @InjectRepository(AccessAuthorityApi) private repositoryAccessAuthorityApi: Repository<AccessAuthorityApi>,
        @InjectRepository(AccessAuthority) private repositoryAccessAuthority: Repository<AccessAuthority>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private i18n: I18nService,
        private configService: ConfigService,
        private tokenService: TokenService,
        private otpService: OTPService,
        private accessRoleService: AccessRoleService,
        private accessAuthorityService: AccessAuthorityService,
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
        // 权限数据
        await this.loadAccessData(account, options);
        // token
        const payload = { sub: account.id, username: account.username };
        return this.tokenService.create(payload, options);
    }

    flatTree(tree: AuthorityTree[]): AuthorityTree[] {
        const result = [];
        for(let i = 0; i < tree.length; i++) {
            const item = tree[i];
            result.push(item);
            if(item.children && item.children.length) {
                const children = this.flatTree(item.children);
                result.push(...children);
            }
        }
        return result;
    }

    async loadAccessData(account: AuthAccount, options: TokenOptions): Promise<any> {
        const ttl = ms(options.expiresIn)/1000;
        const authConfig = this.configService.get<AuthConfig>("auth");
        const authoritiesKey = `session:${account.username}:authorities`;
        const apisKey = `session:${account.username}:apis`;
        if(authConfig.su === account.username) { // 超管
            const all = await this.repositoryAccessAuthority.find();
            const authorityNames = all.map(item => item.key);
            await this.cacheService.set(authoritiesKey, authorityNames, { ttl });
            await this.cacheService.set(apisKey, [], { ttl });
        }else{ // 普通用户
            const query = this.repository.createQueryBuilder("account")
                .leftJoinAndSelect(AuthAccountRole, "ar", "ar.accountId = account.id")
                .leftJoinAndSelect(AccessRole, 'role', "role.id = ar.roleId")
                .leftJoinAndSelect(AccessRoleAuthority, 'ara', "ara.roleId = role.id")
                .leftJoinAndSelect(AccessAuthority, 'aa', "aa.id = ara.authorityId")
                .select("aa.*")
                .where("account.id = :id and aa.id is not null", { id: account.id });
            let authorities = await query.getRawMany<AccessAuthority>();
            const ids = authorities.map(item => item.id);
            const tree = await this.accessAuthorityService.treeByIds(ids);
            const flatTree = this.flatTree(tree);
            const authorityIds = flatTree.map(item => item.id);
            const authorityNames = flatTree.map(item => item.key);
            let apis = [];
            if(authorities.length) {
                const apisQuery = this.repositoryAccessAuthorityApi.createQueryBuilder("aaa")
                    .leftJoinAndSelect(AccessApi, "api", "api.id = aaa.apiId")
                    .select("api.*")
                    .where("aaa.authorityId IN (:...authorityIds) and api.id is not null", { authorityIds });
                apis = await apisQuery.getRawMany<AccessApi>();
            }
            await this.cacheService.set(authoritiesKey, authorityNames, { ttl });
            await this.cacheService.set(apisKey, apis, { ttl });
        }
    }

    async otpSecret(id: number): Promise<OTPResult|Result<any>> {
        const account = await this.repository.findOneBy({ id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const otp = await this.otpService.generate(account.username, account.otpSecret);
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

    async initPassword(username: string, password: string):Promise<Result<any>> {
        const authConfig = this.configService.get<AuthConfig>("auth");
        const pwd = aesEncrypt(password, authConfig.aesKey);
        await this.repository.createQueryBuilder()
            .update()
            .set({
                password: pwd
            })
            .where("username = :username", { username })
            .execute();
        return Result.success();
    }

    async checkOTP(id: number, code: string): Promise<boolean> {
        const account = await this.repository.findOneBy({ id: id });
        if(!account) {
            return false;
        }
        console.log(account.otpSecret, code);
        return this.otpService.verify({
            secret: account.otpSecret,
            token: code
        });
    }

    async setPassword(request: SetPasswordRequest): Promise<TokenResult|Result<any>> {
        const account = await this.repository.findOneBy({ id: request.id });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const verified = await this.checkOTP(request.id, request.otpCode);
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
        const auth = this.configService.get<AuthConfig>("auth");
        if(auth.defaultRole) {
            await this.addRoles(request.id, [auth.defaultRole]);
        }
        return await this.createToken(account, {expiresIn: "1d"});
    }

    async addRoles(id: number, roleNames: string[]): Promise<Result<any>> {
        const roles = await this.accessRoleService.getRolesByNames(roleNames);
        const roleIds = roles.map(item => item.id);
        await this.accessRoleService.saveRoles(id, roleIds);
        return Result.success();
    }

    async resetPassword(request: ResetPasswordRequest): Promise<TokenResult|Result<any>> {
        const account = await this.repository.findOneBy({ id: request.id, status: 1 });
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

    async login(username: string, password: string, code?: string): Promise<Result<TokenResult>> {
        const authConfig = this.configService.get<AuthConfig>("auth");
        const pwd = decrypt(password, authConfig.transport.privateKey);
        const info = await this.repository.findOneBy({
            username
        })
        if(!info) {
            return Result.error({code: 1, message: this.i18n.t("account.login.error")} );
        }
        if(pwd !== aesDecrypt(info.password, authConfig.aesKey)) {
            return Result.error({code: 2, message: this.i18n.t("account.login.error")} );
        }
        if(code) {
            const authConfig = this.configService.get<AuthConfig>("auth");
            if(authConfig.resetOtpCode === code) { // 需要重置密码
                if(info.otpStatus === 0) {
                    const token = await this.createToken(info, {expiresIn: "5m"});
                    return Result.success({code: 17, data: token});
                }else{
                    return Result.error({code: 4, message: this.i18n.t("account.otp.is_bind")} );
                }
            }else{
                const verified = await this.checkOTP(info.id, code);
                if(!verified) {
                    return Result.error({code: 3, message: this.i18n.t("account.otp.verify")} );
                }
            }
        }
        const token = await this.createToken(info, {expiresIn: "1d"});
        return Result.success({data: token});
    }

    async findById(id: number): Promise<AuthAccount> {
        return await this.repository.findOneBy({ id });
    }

    async saveRoles(username: string, roles: number[]): Promise<Result<any>> {
        const account = await this.findByUsername(username);
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        await this.accessRoleService.saveRoles(account.id, roles);
        return Result.success();
    }

    async getRoles(username: string): Promise<AccessRole[]> {
        const query = this.repository.createQueryBuilder('a')
            .leftJoinAndSelect(AuthAccountRole, "ar", "ar.accountId = a.id")
            .leftJoinAndSelect(AccessRole, 'r', "r.id = ar.roleId")
            .select("r.*")
            .where("a.username = :username and r.id is not null", { username });
        return await query.getRawMany<AccessRole>();
    }

    async disable(username: string): Promise<Result<any>> {
        await this.repository.createQueryBuilder()
            .update()
            .set({ status: 2 })
            .where("username = :username", { username })
            .execute();
        return Result.success();
    }

    async enable(username: string): Promise<Result<any>> {
        await this.repository.createQueryBuilder()
            .update()
            .set({ status: 1 })
            .where("username = :username", { username })
            .execute();
        return Result.success();
    }

    async reset2fa(username: string): Promise<Result<any>> {
        const otp = await this.otpService.generate(username);
        await this.repository.createQueryBuilder()
            .update()
            .set({
                otpSecret: otp.secret,
                otpStatus: 0
            })
            .where("username = :username", { username })
            .execute();
        return Result.success();
    }

    async bind2fa(id: number, code: string): Promise<Result<TokenResult>> {
        const verified = await this.checkOTP(id, code);
        if(!verified) {
            return Result.error({code: 1, message: this.i18n.t("account.otp.verify")} );
        }
        await this.repository.createQueryBuilder()
            .update()
            .set({
                otpStatus: 1
            })
            .where("id = :id", { id })
            .execute();
        const account = await this.findById(id);
        const token = await this.createToken(account, {expiresIn: "1d"});
        return Result.success({data: token});
    }

    async logout(token: string): Promise<Result<any>> {
        const sessionUser = await this.tokenService.verify(token);
        const size = await this.tokenService.logout(token);
        if(size === 0) {
            const authoritiesKey = `session:${sessionUser.username}:authorities`;
            const apisKey = `session:${sessionUser.username}:apis`;
            const infoKey = `session:${sessionUser.username}:info`;
            await this.cacheService.del(authoritiesKey);
            await this.cacheService.del(apisKey);
            await this.cacheService.del(infoKey);
        }
        return Result.success();
    }

    async changePassword(request: AccountPasswordDTO): Promise<Result<any>> {
        const account = await this.repository.findOneBy({ username: request.username, status: 1 });
        if(!account) {
            return Result.error({code: 1, message: this.i18n.t("account.notfound")} );
        }
        const authConfig = this.configService.get<AuthConfig>("auth");
        const p = decrypt(request.password, authConfig.transport.privateKey);
        const np = aesEncrypt(p, authConfig.aesKey);
        const op = aesDecrypt(account.password, authConfig.aesKey);
        const opi = decrypt(request.originPassword, authConfig.transport.privateKey);
        if(op !== opi) {
            return Result.error({code: 2, message: this.i18n.t("account.password.origin")} );
        }
        if(op === p) {
            return Result.error({code: 3, message: this.i18n.t("account.password.same")} );
        }
        await this.repository.createQueryBuilder()
            .update()
            .set({ password: np })
            .where("id = :id", { id: account.id })
            .execute();
        await this.logout(request.token);
        return Result.success();
    }

}
