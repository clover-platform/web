import fetchIntercept from 'fetch-intercept';
import {useEffect, useRef} from "react";

export type UseFetchInterceptProps = {
  start?: () => void;
  done?: () => void;
}

export const useFetchIntercept = (props: UseFetchInterceptProps) => {
  const requestNumberRef = useRef(0);

  const onStart = () => {
    props.start?.();
  }

  const onStop = () => {
    if (requestNumberRef.current === 0)
      props.done?.();
  }

  useEffect(() => {
    const unregister = fetchIntercept.register({
      request: function (url: string, config) {
        // Modify the url or config here
        if (url.toString().includes('?_rsc=')) {
          requestNumberRef.current++;
          onStart();
        }
        return [url, config];
      },

      requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
      },

      response: function (response) {
        const {url} = response.request;
        if (url.includes('?_rsc=')) {
          requestNumberRef.current--;
          onStop();
        }
        // Modify the reponse object
        return response;
      },

      responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
      }
    });

    return () => {
      unregister();
    }
  }, []);
}
