/** @jsxImportSource @emotion/react */
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { indentBase } from './styled';

const commonStyles = css({
    display: 'flex',
    boxSizing: 'border-box',
    minHeight: 40,
    padding: `${token('space.100', '10px')} ${indentBase} ${token(
        'space.100',
        '10px',
    )} var(--indent, ${indentBase})`,
    position: 'relative',
    alignItems: 'center',
    color: token('color.text', N800),
    lineHeight: token('font.lineHeight.200', '20px'),
});

interface CommonCellProps {
  indent?: string;
  width?: string | number;
  children?: ReactNode;
}

/**
 * __Common cell__
 */
const CommonCell: FC<HTMLAttributes<HTMLDivElement> & CommonCellProps> = ({
    indent,
    width,style = {},className,
    ...props
}) => (
    <div
        {...props}
        style={{ '--indent': indent, width, ...style } as CSSProperties}
        css={commonStyles}
        className={className}
    />
);

export default CommonCell;
