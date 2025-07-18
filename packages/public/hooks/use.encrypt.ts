import { useCommonConfig } from '@clover/public/hooks'
import { encrypt } from '@clover/public/utils/crypto'

export const useEncrypt = () => {
  const config = useCommonConfig()
  if (!config?.publicKey) {
    return (text: string) => text
  }
  return (text: string) => encrypt(text, config.publicKey)
}