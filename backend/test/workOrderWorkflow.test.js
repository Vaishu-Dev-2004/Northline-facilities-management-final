import test from 'node:test';
import assert from 'node:assert/strict';
import { WORK_ORDER_STATUSES, canClientUpdateWorkOrder, canTransitionWorkOrder, isWorkOrderStatus } from '../src/domain/workOrderWorkflow.js';

test('the workflow exposes every India-demo service state', () => {
  for (const status of ['NEW','PENDING_REVIEW','ASSIGNED','DISPATCHED','IN_PROGRESS','ON_HOLD','WAITING_FOR_PARTS','COMPLETED','CLIENT_APPROVAL','CLOSED','CANCELLED']) {
    assert.ok(WORK_ORDER_STATUSES.includes(status));
    assert.ok(isWorkOrderStatus(status));
  }
  assert.equal(isWorkOrderStatus('TECHNICIAN_EN_ROUTE'), false);
});

test('the main request lifecycle follows review, assignment, field work and client approval', () => {
  const path = ['NEW','PENDING_REVIEW','ASSIGNED','DISPATCHED','IN_PROGRESS','COMPLETED','CLIENT_APPROVAL','CLOSED'];
  for (let i = 0; i < path.length - 1; i += 1) assert.ok(canTransitionWorkOrder(path[i], path[i + 1]));
});

test('invalid skips and terminal-state changes are rejected', () => {
  assert.equal(canTransitionWorkOrder('NEW', 'ASSIGNED'), false);
  assert.equal(canTransitionWorkOrder('IN_PROGRESS', 'CLIENT_APPROVAL'), false);
  assert.equal(canTransitionWorkOrder('COMPLETED', 'CLOSED'), false);
  assert.equal(canTransitionWorkOrder('CLOSED', 'IN_PROGRESS'), false);
  assert.equal(canTransitionWorkOrder('CANCELLED', 'ASSIGNED'), false);
});

test('hold and parts-waiting states can be resumed without discarding history', () => {
  assert.ok(canTransitionWorkOrder('IN_PROGRESS', 'ON_HOLD'));
  assert.ok(canTransitionWorkOrder('ON_HOLD', 'IN_PROGRESS'));
  assert.ok(canTransitionWorkOrder('IN_PROGRESS', 'WAITING_FOR_PARTS'));
  assert.ok(canTransitionWorkOrder('WAITING_FOR_PARTS', 'IN_PROGRESS'));
});

test('clients may cancel only their own new request or approve a client-review request', () => {
  assert.ok(canClientUpdateWorkOrder('CANCELLED', 'NEW', 'user-1', 'user-1'));
  assert.equal(canClientUpdateWorkOrder('CANCELLED', 'NEW', 'user-1', 'user-2'), false);
  assert.equal(canClientUpdateWorkOrder('CANCELLED', 'ASSIGNED', 'user-1', 'user-1'), false);
  assert.ok(canClientUpdateWorkOrder('CLOSED', 'CLIENT_APPROVAL', 'user-1', 'user-2'));
  assert.equal(canClientUpdateWorkOrder('CLOSED', 'COMPLETED', 'user-1', 'user-2'), false);
});
