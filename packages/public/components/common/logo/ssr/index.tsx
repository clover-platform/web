import classNames from 'classnames'
import { type PropsWithChildren, useMemo } from 'react'

export type LogoType = 'normal' | 'light' | 'dark'

interface LogoProps extends PropsWithChildren {
  type?: LogoType
  size?: number
  className?: string
}

const Logo = (props: LogoProps) => {
  const { type = 'normal', size = 32, className } = props

  const themeClass = useMemo(() => {
    if (type === 'dark')
      return {
        bg: 'bg-[#2E3340]',
        image: 'bg-[url(@clover/public/assets/image/logo/light.png)]',
      }
    if (type === 'light')
      return {
        bg: 'bg-white',
        image: 'bg-[url(@clover/public/assets/image/logo/dark.png)]',
      }
    return {
      bg: 'bg-transparent',
      image: 'bg-[url(@clover/public/assets/image/logo/normal.png)]',
    }
  }, [type])

  const margin = useMemo(() => Math.floor(size * 0.1), [size])
  const imageSize = useMemo(() => size - margin * 2, [size, margin])

  return (
    <div className={classNames('flex items-center justify-center rounded-sm', themeClass.bg, className)}>
      <div
        className={classNames(themeClass.image, 'bg-center bg-contain bg-no-repeat')}
        style={{
          width: imageSize,
          height: imageSize,
          margin,
        }}
      />
    </div>
  )
}

export default Logo
