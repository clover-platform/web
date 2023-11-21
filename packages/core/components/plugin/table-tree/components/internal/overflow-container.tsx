/** @jsxImportSource @emotion/react */
import type { FC, HTMLAttributes, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

interface OverflowContainerProps {
  isSingleLine?: boolean;
  chilren?: ReactNode;
}

const overflowContainerStyles = css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

/**
 * __Overflow container__
 */
const OverflowContainer: FC<
  OverflowContainerProps & HTMLAttributes<HTMLSpanElement>
> = ({ isSingleLine, ...props }) => (
    <span css={isSingleLine && overflowContainerStyles} {...props} />
);

export default OverflowContainer;
