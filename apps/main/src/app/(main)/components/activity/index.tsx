import { useTabs } from './config'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@easykit/design'

export const Activity = () => {
  const tabs = useTabs()
  return (
    <Tabs defaultValue={tabs[0].id}>
      <TabsList className="bg-black/5 dark:bg-white/5">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
