import fetchIntercept from 'fetch-intercept';
import { useCallback, useEffect, useRef } from 'react'

export type UseFetchInterceptProps = {
  start?: () => void;
  done?: () => void;
}

export const useFetchIntercept = (props: UseFetchInterceptProps) => {
  const requestNumberRef = useRef(0)

  const onStart = useCallback(() => {
    props.start?.()
  }, [props.start])

  const onStop = useCallback(() => {
    if (requestNumberRef.current === 0) props.done?.()
  }, [props.done])

  useEffect(() => {
    const unregister = fetchIntercept.register({
      request: (url: string, config) => {
        // Modify the url or config here
        if (url.toString().includes('?_rsc=')) {
          requestNumberRef.current++
          onStart()
        }
        return [url, config]
      },

      requestError: (error) => {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error)
      },

      response: (response) => {
        const { url } = response.request
        if (url.includes('?_rsc=')) {
          requestNumberRef.current--
          onStop()
        }
        // Modify the reponse object
        return response
      },

      responseError: (error) => {
        // Handle an fetch error
        return Promise.reject(error)
      },
    })

    return () => {
      unregister()
    }
  }, [onStart, onStop])
}
