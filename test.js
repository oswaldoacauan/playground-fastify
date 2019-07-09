const rp = require('request-promise');

async function main() {
  const options = {
    method: 'POST',
    uri: `http://127.0.0.1:3000`,
    qs: {
      access_token: 'xxxxx xxxxx',
    },
    headers: {
      'my-header': 'james',
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
    ]

    console.log(responses);
  } catch (error) {
    console.error('error', error.message);
  }
}

main();