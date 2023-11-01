import Redis from 'ioredis';
import Redlock, { ResourceLockedError } from "redlock";

const client = new Redis(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST, {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
})

const redlock = new Redlock([client], {
    retryDelay: 200, // time in ms
    retryCount: 5,
});

export default redlock;
