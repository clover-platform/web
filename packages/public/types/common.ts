declare module '@clover/public/utils/i18next/data' {
  export const getPath: (path: string) => string;
  // biome-ignore lint/suspicious/noExplicitAny: dataLoader
  export const dataLoader: (config: any) => Promise<any>
  // biome-ignore lint/suspicious/noExplicitAny: langData
  const langData: any
  export default langData;
}

declare module '@arco-iconbox/react-clover' {
  import type { FC } from 'react'
  export type IconProps = FC<{
    className?: string
    fontSize?: number
  }>
  export const IconProject: IconProps
  export const IconWechat: IconProps
  export const IconGithub: IconProps
  export const IconSpin: IconProps
  export const IconInfo: IconProps
  export const IconWarning: IconProps
  export const IconSetting: IconProps
  export const IconAccess: IconProps
  export const IconTodo: IconProps
  export const IconGantt: IconProps
  export const IconHome: IconProps
  export const IconUser: IconProps
  export const IconAdd: IconProps
  export const IconI18n: IconProps
  export const IconNew: IconProps
  export const IconSearch: IconProps
  export const IconHelp: IconProps
  export const IconColumns: IconProps
  export const IconWiki: IconProps
  export const IconAudit: IconProps
  export const IconFile: IconProps
  export const IconSidebar: IconProps
  export const IconCreateTeam: IconProps
  export const IconJoinTeam: IconProps
  export const IconDelete: IconProps
  export const IconTranslation: IconProps
  export const IconMember: IconProps
  export const IconSource: IconProps
  export const IconActivity: IconProps
  export const IconDashboard: IconProps
  export const IconDownload: IconProps
  export const IconBranch: IconProps
  export const IconMenu: IconProps
  export const IconRightSidebar: IconProps
  export const IconBack: IconProps
  export const IconLeftSidebar: IconProps
  export const IconShare: IconProps
  export const IconClear: IconProps
  export const IconChatGPT: IconProps
  export const IconComment: IconProps
  export const IconGoogleTranslate: IconProps
  export const IconComingSoon: IconProps
  export const IconSend: IconProps
  export const IconAndroid: IconProps
  export const IconIOS: IconProps
  export const IconFlutter: IconProps
  export const IconJSON: IconProps
  export const IconAddFile: IconProps
  export const IconBook: IconProps
  export const IconCatalog: IconProps
  export const IconCollapse: IconProps
  export const IconExpand: IconProps
  export const IconX: IconProps
  export const IconGithubCircle: IconProps
  export const IconDark: IconProps
  export const IconLight: IconProps
  export const IconSystem: IconProps
  export const IconTeam: IconProps
  export const IconAIChatFill: IconProps
  export const IconAI: IconProps
  export const IconApps: IconProps
  export const IconQA: IconProps
  export const IconNotice: IconProps
  export const IconHelpFill: IconProps
  export const IconSettingFill: IconProps
  export const IconSwitch: IconProps
  export const IconEXCEL: IconProps
}
