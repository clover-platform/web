import type { FC, PropsWithChildren } from 'react'
import { Button } from '@easykit/design'
import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'

export type LinkProps = {
  tabIndex?: number
} & NextLinkProps &
  PropsWithChildren

const Link: FC<LinkProps> = (props) => {
  return (
    <NextLink {...props}>
      <Button className="h-4 p-0" tabIndex={props.tabIndex} type="button" variant="link">
        {props.children}
      </Button>
    </NextLink>
  )
}

export default Link
