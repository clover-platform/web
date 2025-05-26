import { Button } from '@easykit/design'
import NextLink from "next/link";
import type {LinkProps as NextLinkProps} from "next/link";
import type { FC, PropsWithChildren } from 'react'

export type LinkProps = {
  tabIndex?: number;
} & NextLinkProps & PropsWithChildren

const Link: FC<LinkProps> = (props) => {
  return (
    <NextLink {...props}>
      <Button tabIndex={props.tabIndex} type="button" variant="link" className="h-4 p-0">
        {props.children}
      </Button>
    </NextLink>
  )
};

export default Link;
