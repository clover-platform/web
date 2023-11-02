'use client';
import { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';

const AppRootLayout = ({children}: PropsWithChildren) => {
    return <html className={`{#LANG#}`}>
        <body>
            <RecoilRoot>
                { children }
            </RecoilRoot>
        </body>
    </html>
};

export default AppRootLayout;
