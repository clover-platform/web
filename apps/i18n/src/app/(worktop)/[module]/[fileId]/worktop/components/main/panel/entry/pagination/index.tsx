import type { FC } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'

export type PaginationProps = {
  page: number
  pages: number
  onChange?: (page: number) => void
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { page, pages } = props

  const firstDisabled = page === 1
  const lastDisabled = page === pages
  const nextDisabled = lastDisabled
  const prevDisabled = firstDisabled

  const textClassName = 'w-7 h-7 flex justify-center items-center text-white/60 rounded-md'
  const itemClassName = classNames(textClassName, 'hover:bg-white/20 hover:text-white/100 cursor-pointer')
  const disabledClassName = '!bg-transparent !text-white/60 opacity-70'

  return (
    <div className={classNames('flex items-center justify-center rounded-md bg-black/50 p-1', 'hover:bg-black/70')}>
      <div
        className={classNames(itemClassName, firstDisabled ? disabledClassName : null)}
        onClick={() => {
          if (firstDisabled) return
          props.onChange?.(1)
        }}
      >
        <DoubleArrowLeftIcon />
      </div>
      <div
        className={classNames(itemClassName, prevDisabled ? disabledClassName : null)}
        onClick={() => {
          if (prevDisabled) return
          props.onChange?.(page - 1)
        }}
      >
        <ChevronLeftIcon />
      </div>
      <div className={classNames(textClassName, '!text-white')}>{props.page}</div>
      <div
        className={classNames(itemClassName, nextDisabled ? disabledClassName : null)}
        onClick={() => {
          if (nextDisabled) return
          props.onChange?.(page + 1)
        }}
      >
        <ChevronRightIcon />
      </div>
      <div
        className={classNames(itemClassName, lastDisabled ? disabledClassName : null)}
        onClick={() => {
          if (lastDisabled) return
          props.onChange?.(pages)
        }}
      >
        <DoubleArrowRightIcon />
      </div>
    </div>
  )
}
