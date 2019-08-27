function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// FASTIFY
// ===============
const fastify = require("fastify")({
  logger: true
});

fastify.register(require("fastify-sensible"));

fastify.post("/", async (request, reply) => {
  reply.type("application/json").code(200).send({ hello: "world" });
});

fastify.post("/error", async (request, reply) => {
  throw fastify.httpErrors.forbidden("🚫");
});

fastify.post("/async", async (request, reply) => {
  reply.code(200).send("OK");
  await sleep(2000);
  console.info("--- SLEEP AFTER 2S ---");
  await sleep(5000);
  console.info("--- SLEEP AFTER 5S ---");
  await sleep(10000);
  console.info("--- SLEEP AFTER 10S ---");
});

fastify.post("/async/error", async (request, reply) => {
  try {
    reply.code(200).send("OK");
    await sleep(3000);
    throw "--- SLEEP ERROR AFTER 3S ---"
  } catch (error) {
    console.error(error);
  }
});

fastify.listen(3000, (err, address) => {
  if (err) throw err;
});
