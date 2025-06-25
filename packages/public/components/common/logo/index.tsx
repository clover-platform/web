import dynamic from 'next/dynamic'

const Logo = dynamic(() => import('./ssr'), {
  ssr: false,
})

export default Logo