import Cookies from 'js-cookie'
import { useTheme } from 'next-themes'
import { useLocale, useVisibilityChange } from '@clover/public/hooks'

export const useRestoreSettings = () => {
  const { setTheme } = useTheme()
  const [_locale, setLocale] = useLocale()
  useVisibilityChange((isVisible) => {
    if (isVisible) {
      const theme = Cookies.get('theme')
      if (theme) {
        setTheme(theme)
      }
      const locale = Cookies.get('i18next')
      if (locale) {
        setLocale(locale)
      }
    }
  })
}
