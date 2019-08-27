function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ENV = process.env.NODE_ENV || 'dev';

// FASTIFY
// ===============
const fastify = require("fastify")({
  logger: {
    prettyPrint: ENV !== 'dev' ? false : { colorize: true },
  },
});

fastify.register(require("fastify-sensible"));

fastify.post("/", async (request, reply) => {
  reply.type("application/json").code(200).send({ hello: "world" });
});

fastify.post("/error", async (request, reply) => {
  throw fastify.httpErrors.forbidden("🚫");
});

fastify.post("/uncaught", async (request, reply) => {
  throw new Error('Random Error');
});

fastify.post("/async", async (request, reply) => {
  reply.code(200).send("OK");
  await sleep(2000);
  request.log.info("--- SLEEP AFTER 2S ---");
  await sleep(5000);
  request.log.info("--- SLEEP AFTER 5S ---");
  await sleep(10000);
  request.log.info("--- SLEEP AFTER 10S ---");
});

fastify.post("/async/error", async (request, reply) => {
  try {
    reply.code(200).send("OK");
    await sleep(3000);
    throw "--- SLEEP ERROR AFTER 3S ---"
  } catch (error) {
    request.log.error(error);
  }
});

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();
