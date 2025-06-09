import { getSupportWay } from '../config'

const QuickLogin = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {getSupportWay().map((item) => {
        return (
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/account/auth/link/${item.id}`}
            key={item.id}
            className="mx-[15px] my-[10px] flex flex-col items-center justify-center"
          >
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary">
              {item.icon}
            </div>
            <div className="mt-[10px] text-[14px] text-muted-foreground">{item.title}</div>
          </a>
        )
      })}
    </div>
  )
}

export default QuickLogin
