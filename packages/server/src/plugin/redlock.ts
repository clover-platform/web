import Redis from 'ioredis';
import Redlock, { ResourceLockedError } from "redlock";

const client = new Redis(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST, {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
})

const redlock = new Redlock([client], {
    driftFactor: 0.01,
    retryCount: 10,
    retryDelay: 200,
    retryJitter: 200,
    automaticExtensionThreshold: 500
});

export default redlock;
