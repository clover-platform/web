import {NextConfig} from "next";

export type Plugin = (config: NextConfig) => NextConfig;

export default function withPageImports(options: {
  imports: string[]
}): Plugin;
