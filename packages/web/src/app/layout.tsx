'use client';
import {PropsWithChildren, useEffect} from 'react';
import { RecoilRoot } from 'recoil';
import '@/plugin/rest';
import {profile} from "@/rest/auth";

const AppRootLayout = ({children}: PropsWithChildren) => {
    useEffect(() => {
        profile().then();
    }, [])

    return <html className={`{#LANG#}`}>
        <body>
            <RecoilRoot>
                { children }
            </RecoilRoot>
        </body>
    </html>
};

export default AppRootLayout;
