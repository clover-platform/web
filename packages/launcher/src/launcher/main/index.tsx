import { ViewController } from "@/launcher/main/view-controller";
import { Footer } from "@/launcher/main/footer";
import { Header } from "@/launcher/main/header";
import { Desktop } from "@/launcher/main/desktop";

export const Main = () => {
    return <div className={"z-[var(--layer-main)] absolute cover-full"}>
        <ViewController />
        <div className={"flex justify-center items-center flex-col h-full"}>
            <Header />
            <Desktop />
            <Footer />
        </div>
    </div>
}
