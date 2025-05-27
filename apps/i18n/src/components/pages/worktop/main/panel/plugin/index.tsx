import { AIPlugin } from '@/components/pages/worktop/main/panel/plugin/ai'
import { ComingSoon } from "@/components/pages/worktop/main/panel/plugin/coming-soon";
import { Comment } from "@/components/pages/worktop/main/panel/plugin/comment";
import { IconChatGPT, IconComment, IconGoogleTranslate } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { t } from "@clover/public/utils/locale.client";
import { Tooltip } from '@easykit/design'
import { type ReactNode, useMemo, useState } from 'react'
import { EntryCheck } from '../../check/entry'

export type Plugin = {
  id: string;
  name: string;
  icon: ReactNode;
  panel: ReactNode;
}

export const getPlugins = (): Plugin[] => [
  {
    id: 'comment',
    name: t('评论'),
    icon: <IconComment className="text-lg" />,
    panel: <Comment />,
  },
  {
    id: 'ai',
    name: t('AI建议'),
    icon: <IconChatGPT className="text-lg" />,
    panel: <AIPlugin />,
  },
  {
    id: 'google',
    name: t('谷歌翻译'),
    icon: <IconGoogleTranslate className="text-lg" />,
    panel: <ComingSoon />,
  },
]

export const PluginPanel = () => {
  const [activePlugin, setActivePlugin] = useState<string>("comment");

  const plugin = useMemo(() => {
    return getPlugins().find(plugin => plugin.id === activePlugin);
  }, [activePlugin])

  return (
    <EntryCheck className="bg-muted">
      <div className="flex h-full w-full items-stretch justify-center">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full px-3 py-3 font-medium text-base">{plugin?.name}</div>
          <div className="h-0 w-full flex-1 flex-shrink-0">{plugin?.panel}</div>
        </div>
        <div className="border-l bg-muted p-2">
          {getPlugins().map((plugin, index) => {
            return (
              <Tooltip content={plugin.name} side="left" key={plugin.name}>
                <Action
                  onClick={() => setActivePlugin(plugin.id)}
                  active={activePlugin === plugin.id}
                  className={index < getPlugins().length - 1 ? 'mb-2' : ''}
                >
                  {plugin.icon}
                </Action>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </EntryCheck>
  )
}
