'use client';
import { BookLayout } from "@/components/layout/book";
import {FC, PropsWithChildren} from "react";
const Layout: FC<PropsWithChildren> = (props) => <BookLayout {...props} />
export default Layout;
