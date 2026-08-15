import assert from 'node:assert/strict';
import test from 'node:test';
import { isConnectionLimitResponse } from './errors.js';

test('Premiumize access denial fails over instead of throttling as capacity', () => {
  const reply = '502 Access denied to your node';

  assert.equal(isConnectionLimitResponse(502, reply), false);
});

test('explicit connection-limit replies remain transient capacity events', () => {
  assert.equal(
    isConnectionLimitResponse(502, '502 too many connections for your user'),
    true
  );
});
