import { PASSWORD } from './regular';

export const isPassword = (v: string): boolean => PASSWORD.test(v)
