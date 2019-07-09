function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// FASTIFY
// ===============
const fastify = require('fastify')({
  logger: true,
})

fastify.register(require('fastify-sensible'))
fastify.register((request, reply, next) => {
  request.log.info('--- FASTIFY ---');
  next();
})

fastify.post('/', async (request, reply) => {
  console.log('body:', request.body)
  console.log('query:', request.query)
  console.log('params:', request.params)
  console.log('headers:', request.headers)
  reply.type('application/json').code(200)
  return { hello: 'world' }
})

fastify.post('/error', async (request, reply) => {
  throw fastify.httpErrors.forbidden('🚫')
})

fastify.post('/async', (request, reply) => {
  sleep(2500).then(() => request.log.info('--- SLEEP AFTER 2.5S ---'))
  reply.code(200).send('OK');
})

fastify.post('/async/error', (request, reply) => {
  sleep(3000)
    .then(() => Promise.reject('--- SLEEP ERROR 3S ---'))
    .catch(err => request.log.error(err))
  
  reply.code(200).send('OK');
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})