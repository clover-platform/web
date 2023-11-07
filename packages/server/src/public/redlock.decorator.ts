import { Settings } from "redlock";
import {Inject} from "@nestjs/common";
import {RedlockService} from "./redlock.service";

export const Redlock = (resources: string[], duration: number, settings?: Partial<Settings>) => {
    const inject = Inject(RedlockService);

    return (target, key, descriptor) => {
        inject(target, "redlockService");
        const value = descriptor.value;
        descriptor.value = async function (...args) {
            const redlockService: RedlockService = this.redlockService;
            let lock = null;
            try {
                lock = await redlockService.acquire(resources, duration, settings);
                return await value.call(this, ...args);
            } finally {
                lock && await lock.release();
            }
        }
        return descriptor;
    }
}
