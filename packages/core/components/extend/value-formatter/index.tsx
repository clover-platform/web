import {FC, forwardRef, PropsWithChildren} from "react";
import * as BUILT_IN from '../../../lib/formatters';

export const formatValue = (all: any[], formatters: string[], v: any) => {
    const merged = {...BUILT_IN, ...all};
    const fallback = ((v: any, ...p: any[]) => (v));
    let params = [];

    formatters.forEach((filter: any) => {
        let call = fallback;
        if(typeof filter === 'string') {
            call = merged[filter] || fallback;
        }else if(typeof filter === 'function') {
            call = filter;
        }else if(typeof filter === 'object' && filter.length) {
            call = merged[filter[0]] || fallback;
            params = filter[1];
        }
        try{
            v = call(v, ...params);
        }catch (e) {
            console.log('formatter error', filter);
        }
    });
    return v;
}

export interface ValueFormatterProps extends PropsWithChildren {
    value?: any;
    formatters?: string[];
    handles?: Function[];
}

export const ValueFormatter: FC<ValueFormatterProps> = forwardRef((props, ref) => {
    const {
        handles = [],
        formatters = [],
        value,
        children
    } = props;
    let v = value === 0 ? value : (value || children);
    formatters.push('defaultValue');
    v = formatValue(handles, formatters, v);
    return <>{v}</>
})
