const rp = require('request-promise');

async function main() {
  const options = {
    method: 'POST',
    uri: `http://127.0.0.1:3000`,
    headers: {
      'my-header': 'james',
      'Authorization': 'Bearer a-super-secret-key',
    },
    body: {
      some: 'value',
    },
    json: true,
  };

  const thenHandler = body => console.log(body);
  const catchHandler = error => console.error(e.message) ;
  try {
    const responses = [
      await rp(options),
      await rp({ ...options, uri: options.uri.concat('/error') }).catch(({ error }) => error),
      await rp({ ...options, uri: options.uri.concat('/async') }),
      await rp({ ...options, uri: options.uri.concat('/async/error') }),
      await rp({ ...options, uri: options.uri.concat('/uncaught') }).catch(({ error }) => error),
      await rp({ ...options, uri: options.uri.concat('/some/not-found/route') }).catch(({ error }) => error),
    ]

    console.log(responses);
  } catch (error) {
    console.error('error', error.message);
  }
}

main();