import { ViewController } from "@clover-platform/launcher/launcher/main/controller/view";
import { Footer } from "@clover-platform/launcher/launcher/main/footer";
import { Header } from "@clover-platform/launcher/launcher/main/header";
import { Desktop } from "@clover-platform/launcher/launcher/main/desktop";
import { DesktopController } from "@clover-platform/launcher/launcher/main/controller/desktop";

export const Main = () => {
    return <div className={"z-[var(--layer-main)] absolute cover-full"}>
        <ViewController />
        <DesktopController />
        <div className={"flex justify-center items-center flex-col h-full"}>
            <Header />
            <Desktop />
            <Footer />
        </div>
    </div>
}
