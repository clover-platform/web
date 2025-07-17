export const ACTION_TITLE = {
  'module:create': '创建了模块',
  'module:delete': '删除了模块',
} as const

export const getActionTitle = (action: string) => {
  return ACTION_TITLE[action as keyof typeof ACTION_TITLE] || action
}
