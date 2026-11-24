import assert from 'node:assert/strict';
import test from 'node:test';
import { findLatestTags } from './check-docker-pin.mjs';

test('flags @latest scaffolder tags', () => {
  assert.deepEqual(findLatestTags('RUN npm create adonisjs@latest app'), ['@latest']);
  assert.deepEqual(findLatestTags('FROM node:22-alpine@sha256:abc\nRUN npm create adonisjs@3.4.0 app'), []);
});

test('ignores pinned digests and unrelated latest text', () => {
  const dockerfile = 'FROM node:22-alpine@sha256:abc\n# never use latest\nRUN npm create adonisjs@3.4.0 app\n';
  assert.deepEqual(findLatestTags(dockerfile), []);
});

test('ignores @latest on comment lines', () => {
  const dockerfile = 'FROM node:22-alpine@sha256:abc\n# RUN npm create adonisjs@latest app\n  # old: npm create adonisjs@latest app\nRUN npm create adonisjs@3.4.0 app\n';
  assert.deepEqual(findLatestTags(dockerfile), []);
});
