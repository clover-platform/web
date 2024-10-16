import "@easykit/design/style.css";
import { TabLauncher } from "@clover/launcher";
import { defaultConfig } from "~config";

const NewTab = () => {
    document.title = chrome.i18n.getMessage("extensionName");
    return <TabLauncher defaultConfig={defaultConfig} />;
};

export default NewTab;
