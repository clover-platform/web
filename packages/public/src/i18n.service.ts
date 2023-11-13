import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService as BaseService } from 'nestjs-i18n';

@Injectable()
export class I18nService {
    constructor(private readonly i18n: BaseService) {}

    t(key: string): string {
        return this.i18n.t(key, { lang: I18nContext.current().lang });
    }
}
