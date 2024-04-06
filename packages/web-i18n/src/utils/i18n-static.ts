import LangList from '@clover/public/config/lang.list';
import build from '@easy-kit/i18n/utils/static'
import langData from '@easy-kit/i18n/utils/data'

const config = {
    supports: LangList.map(({code}) => code),
    base: 'en-us',
    staticDir: 'assets/i18n',
    data: langData
};

build(config).then();