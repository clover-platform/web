import redlock from "../plugin/redlock";
import { Settings } from "redlock";

export const Redlock = (resources: string[], duration: number, settings?: Partial<Settings>) => {
    return (target, key, descriptor) => {
        const value = descriptor.value;
        descriptor.value = async function (...args) {
            let lock = null;
            try {
                lock = await redlock.acquire(resources, duration, settings);
                return await value.call(this, ...args);
            } finally {
                lock && await lock.release();
            }
        }
        return descriptor;
    }
}
