import test from 'ava';
import { HttpClient } from '@srclaunch/http-client';
import { HttpServer } from '../index.js';
import { getEnvironment } from '@srclaunch/node-environment';
import { Logger } from '@srclaunch/logger';

test('can create instance of HttpServer', async t => {
  const environment = getEnvironment();
  const port = 8086;
  const server = new HttpServer({
    endpoints: [],
    environment,
    name: 'test-api',
    options: {
      port,
    },
  });

  t.is(server.name, 'test-api');
  t.is(server.environment.id, 'test');
  t.is(server.options.port, port);
});

test('can add Logger instance', async t => {
  const environment = getEnvironment();
  const logger = new Logger({
    environment,
  });
  const port = 8087;
  const server = new HttpServer({
    endpoints: [],
    environment,
    logger,
    name: 'test-api',
    options: {
      port,
    },
  });

  t.is(server.logger, logger);
  t.is(server.logger?.environment?.id, 'test');

  await server.close();
});

test('can start listening on port', async t => {
  const environment = getEnvironment();
  const logger = new Logger({
    environment,
  });
  const port = 8088;
  const server = new HttpServer({
    endpoints: [],
    environment,
    logger,
    name: 'test-api',
    options: {
      port,
    },
  });

  const listener = await server.listen();

  t.is(listener?.listening, true);

  const address = listener.address();

  if (typeof address === 'object') {
    t.is(address?.port, port);
  } else {
    t.fail();
  }

  await server.close();
});

test('receives correct response from healthcheck endpoint', async t => {
  const environment = getEnvironment();
  const logger = new Logger({
    environment,
  });
  const port = 8089;
  const server = new HttpServer({
    endpoints: [],
    environment,
    logger,
    name: 'test-api',
    options: {
      port,
    },
  });

  await server.listen();

  const client = new HttpClient({
    host: `http://localhost:${port}`,
  });

  const response = await client.get('/healthcheck');

  t.is(response.status?.code, 200);

  t.truthy(true);
  await server.close();
});
