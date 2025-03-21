'use client';

import {
  RootLayoutProps as PublicRootLayoutProps,
  RootLayout as PublicRootLayout
} from "@clover/public/components/layout/root";
import {FC} from "react";
import "@/plugin/rest.client";
import "@/plugin/locales";
import {Language} from "@/types/pages/public";
import {languagesState} from "@/state/public";

export type RootLayoutProps = PublicRootLayoutProps & {
  languages: Language[];
};

export const RootLayout: FC<RootLayoutProps> = (props) => {
  const {languages} = props;
  return <PublicRootLayout
    {...props}
    atomValues={[
      [languagesState, languages]
    ]}
  />
}
