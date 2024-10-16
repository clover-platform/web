import LangList from '@clover/public/config/lang.list';
import build from '@easykit/common/utils/locale/static'
import langData from '@easykit/common/utils/locale/data'

const config = {
    supports: LangList.map(({code}) => code),
    base: 'en-us',
    staticDir: 'assets/wiki',
    data: langData
};

build(config).then();
