import {FC, PropsWithChildren} from "react";
import i18next from "i18next";
import {getCode} from "@easykit/common/utils/locale";

export type HTMLLayoutProps = PropsWithChildren;

export const HTMLLayout: FC<HTMLLayoutProps> = (props) => {
    return <html className={getCode(i18next.language)}>
    <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
    </head>
    <body>
        {props.children}
    </body>
    </html>
}
