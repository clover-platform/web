import {FC, PropsWithChildren} from "react";

export type HTMLLayoutProps = PropsWithChildren;

export const HTMLLayout: FC<HTMLLayoutProps> = (props) => {
  return <html suppressHydrationWarning={true}>
    <body>
      {props.children}
    </body>
  </html>
}
