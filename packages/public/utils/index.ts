import { EMAIL, URL as URL_REG } from './regular'
const isProd = process.env.NODE_ENV === 'production'

const langList = [
  {
    key: 'zh-cn',
    value: '简体中文',
    code: 'zh-CN',
  },
  {
    key: 'zh-tw',
    value: '繁體中文',
    code: 'zh-TW',
  },
  {
    key: 'en-us',
    value: 'English',
    code: 'en-US',
  },
]

const isServer = typeof window === 'undefined'

const mobileRegex =
  /(Metalpha|Antalpha|phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i

const iosRegex = /(phone|pad|pod|iPhone|iPod|ios|iPad)/i

const androidRegex = /(Android)/i

const wechatRegex = /(micromessenger|wxwork)/i

export const isEmail = (text: string) => {
  return EMAIL.test(text)
}

export const isUrl = (text: string) => {
  return URL_REG.test(text)
}

// 容错'0'
export const failover = (v: string) => {
  if (v === '0') return ''
  return v
}

function isMobile() {
  if (isServer) return false
  return !!window.navigator.userAgent.match(mobileRegex)
}

function isIOS() {
  if (isServer) return false
  return !!window.navigator.userAgent.match(iosRegex)
}

function isAndroid() {
  if (isServer) return false
  return !!window.navigator.userAgent.match(androidRegex)
}

function isWeChat() {
  if (isServer) return false
  return !!window.navigator.userAgent.match(wechatRegex)
}

export const startWithLang = (path: string) => {
  for (const lang of langList) {
    if (path.startsWith(`/${lang.key}`)) {
      return true
    }
  }
  return false
}

function uuid() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function loadScript(id: string, url: string) {
  return new Promise((resolve) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let script = document.getElementById(id) as any
    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'text/javascript'
      script.src = url
      document.body.appendChild(script)
    }
    if (script.loaded) {
      resolve(id)
      return
    }
    if (script.readyState) {
      const originEvent = script.onreadystatechange
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      script.onreadystatechange = function (event: any) {
        script.loaded = true
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          if (originEvent) {
            originEvent(event)
          }
          console.log('script', id, 'ready')
          resolve(id)
        }
      }
    } else {
      const originEvent = script.onload
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      script.onload = (event: any) => {
        script.loaded = true
        if (originEvent) {
          originEvent(event)
        }
        console.log('script', id, 'onload')
        resolve(id)
      }
    }
  })
}

function loadStyle(id: string, url: string) {
  return new Promise((resolve) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let link = document.getElementById(id) as any
    if (!link) {
      link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
    }
    if (link.loaded) {
      resolve(id)
      return
    }
    const originEvent = link.onload
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    link.onload = (event: any) => {
      if (originEvent) {
        originEvent(event)
      }
      console.log('loadStyle', id, 'onload')
      link.loaded = true
      resolve(id)
    }
  })
}

function getRootDomain(hostname: string) {
  if (!isProd) {
    return undefined
  }
  const parts = hostname.split('.')
  if (parts.length >= 2) {
    return `.${parts.slice(-2).join('.')}`
  }
  return hostname
}

export { getRootDomain, uuid, isServer, isMobile, loadScript, loadStyle, isIOS, isAndroid, isWeChat }
