export type Account = {
  id: number
  email: string
  authorities: string[]
  currentProjectId: number
  currentTeamId: number
  username: string
  avatar?: string
  memo?: string
  readme?: string
}
 
export type User = {
  id: number
  email: string
  username: string
  avatar: string
}
