/** @jsxImportSource @emotion/react */
import type { FC, HTMLAttributes, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { N30, N800 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const iconColor = token('color.text', N800);
export const indentBase = token('space.300', '25px');

const treeRowContainerStyles = css({
    display: 'flex',
    borderBottom: `1px solid ${token('color.border', N30)}`,
});

/**
 * __Tree row container__
 */
export const TreeRowContainer: FC<
  HTMLAttributes<HTMLDivElement> & { children: ReactNode }
> = (props) => (
    <div css={treeRowContainerStyles} {...props} />
);

const commonChevronContainerStyles = css({
    display: 'flex',
    marginLeft: `calc(${indentBase} * -1)`,
    position: 'absolute',
    top: 7,
    alignItems: 'center',
});

type ChevronContainerProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

/**
 * __Chevron container__
 *
 * A wrapper container around the expand table tree button.
 */
export const ChevronContainer: FC<ChevronContainerProps> = (
    props,
) => <span {...props} css={commonChevronContainerStyles} />;

const chevronIconContainerStyles = css({
    position: 'relative',
    top: 1,
});

/**
 * __Chevron icon container__
 *
 * A chevron icon container.
 */
export const ChevronIconContainer: FC<ChevronContainerProps> = (
    props,
) => <span {...props} css={chevronIconContainerStyles} />;

const loadingItemContainerStyles = css({
    width: '100%',
    paddingTop: 5,
});

const paddingLeftStyles = css({
    paddingLeft: '50%',
});

type LoaderItemContainerProps = {
  isRoot?: boolean;
  children: ReactNode;
};

/**
 * __Loader item container__
 *
 * A loader item container.
 */
export const LoaderItemContainer: FC<LoaderItemContainerProps> = ({
    isRoot,
    ...props
}) => (
    <span
        css={[
            commonChevronContainerStyles,
            loadingItemContainerStyles,
            isRoot && paddingLeftStyles,
        ]}
        {...props}
    />
);
