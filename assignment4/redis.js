import { client } from "./index.js";

export function addCache(from, to) {
  client.hSetNX(from, "to", to);
  client.hSetNX(from, "requests", "0");
  client.expire(from, 4 * 60 * 60);
  console.log(`Added ${from} to cache`);
}

export async function getCache(from) {
  const val = await client.hGetAll(from);
  console.log(val);
  const requestCount = val.requests ? parseInt(val.requests) : 0;
  client.hSet(from, "requests", (requestCount + 1).toString());
  // console.log(`Got ${val} from cache`);
  return val;
}
