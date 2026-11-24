import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('the Adonis web app opts into Flisk host-root routing', () => {
  const service = JSON.parse(readFileSync(new URL('../service.json', import.meta.url), 'utf8'));
  assert.equal(service.appType, 'bring-your-own');
  assert.equal(service.webUi, true);
  assert.notEqual(service.exposeViaProxy, false);
});
