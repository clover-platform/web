'use client';

import {TabLauncher} from "@clover-platform/launcher";

export default function Home() {
    return <TabLauncher
        defaultConfig={{
            background: {
                type: "image",
                image: "/assets/wallpaper/default.jpg",
            }
        }}
    />;
}
