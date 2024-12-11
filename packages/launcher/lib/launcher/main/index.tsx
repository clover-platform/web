import { ViewController } from "@clover/launcher/launcher/main/controller/view";
import { Footer } from "@clover/launcher/launcher/main/footer";
import { Header } from "@clover/launcher/launcher/main/header";
import { Desktop } from "@clover/launcher/launcher/main/desktop";
import { DesktopController } from "@clover/launcher/launcher/main/controller/desktop";

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
