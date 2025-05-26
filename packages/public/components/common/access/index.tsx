import {useAccess} from "@clover/public/hooks";
import type { FC, PropsWithChildren } from 'react'

export type AccessProps = {
  value?: string | string[]
  every?: boolean
} & PropsWithChildren

const Access: FC<AccessProps> = (props) => {
  const { value = '', every = true, children } = props;
  const access = useAccess();
  return access(value, every) ? children : null;
}

export default Access;
