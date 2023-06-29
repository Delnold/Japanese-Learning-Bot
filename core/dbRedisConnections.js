import { createClient } from 'redis';
import {redisConnectionString} from './config.js'

const client = createClient({
    url: redisConnectionString
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export default client;