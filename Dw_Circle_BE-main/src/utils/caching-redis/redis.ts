import { createClient } from "redis";

const RedisClient = createClient({
  password: "kC4BxWq7hpGJCMXUPfjFyVXTycaRR4pq",
  socket: {
    host: "redis-10284.c1.asia-northeast1-1.gce.cloud.redislabs.com",
    port: 10284,
  },
});

RedisClient.on("error", function (error) {
  console.error(error);
});

export async function redisConnect() {
  try {
    await RedisClient.connect();
    console.log("Connected To Redis");
  } catch (error) {
    console.log("Redis Client", error);
    process.exit(1);
  }
}

const DEFAULT_EXPIRATION = 3600;

export { RedisClient, DEFAULT_EXPIRATION };
