import day from 'dayjs';

export const time = (v: any, format = 'YYYY-MM-DD HH:mm:ss') => {
    return v ? day(v).format(format) : '--';
}

export const defaultValue = (v: any) => {
    return v === 0 ? v : (v || '--');
}
