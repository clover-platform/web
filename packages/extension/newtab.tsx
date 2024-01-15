import { TabLauncher } from "@clover/launcher";

const NewTab = () => {
    document.title = chrome.i18n.getMessage("extensionName");
    return <TabLauncher />;
};

export default NewTab;
