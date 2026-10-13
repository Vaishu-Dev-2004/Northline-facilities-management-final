import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';

const STORAGE_KEY = 'northline.fm.demo.v1';
const values = new Map();
globalThis.localStorage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, String(value)),
  removeItem: (key) => values.delete(key)
};
const { addRecord, getStore, resetDemo, saveStore, updateWorkOrder } = await import('../src/store.js');

beforeEach(() => resetDemo());

test('new demo messages retain their originating workspace and sender', () => {
  const record = addRecord('message', { sender: 'Kavya Raman', company: 'Meridian Workspaces', subject: 'Chiller access', body: 'The evening access window is confirmed.' });
  assert.equal(record.sender, 'Kavya Raman');
  assert.equal(record.company, 'Meridian Workspaces');
  assert.equal(record.subject, 'Chiller access');
  assert.equal(record.preview, 'The evening access window is confirmed.');
});

test('local demo enforces review, assignment, dispatch and technician handover states', () => {
  assert.equal(updateWorkOrder('WO-4817', { status: 'Dispatched' }), null, 'pending review cannot skip assignment');
  assert.equal(updateWorkOrder('WO-4817', { status: 'Assigned', assignee: 'Senthil Kumar' }).status, 'Assigned');
  assert.equal(updateWorkOrder('WO-4817', { status: 'Dispatched' }).status, 'Dispatched');
  assert.equal(updateWorkOrder('WO-4817', { status: 'In Progress' }).status, 'In Progress');
  assert.equal(updateWorkOrder('WO-4817', { status: 'Completed', completionNote: 'A sufficient handover note.' }), null, 'completion requires a safety confirmation');
  assert.equal(updateWorkOrder('WO-4817', { status: 'Completed', completionNote: 'A sufficient handover note.', siteSafetyConfirmedAt: '08 Oct 2026, 10:00 IST' }).status, 'Completed');
  assert.equal(updateWorkOrder('WO-4817', { status: 'Client Approval' }).status, 'Client Approval');
});

test('client approval closes a review request and closed requests are terminal', () => {
  assert.equal(updateWorkOrder('WO-4818', { status: 'Closed' }).status, 'Closed');
  assert.equal(updateWorkOrder('WO-4818', { status: 'In Progress' }), null);
  const record = getStore().workOrders.find((order) => order.id === 'WO-4818');
  assert.ok(record.clientApprovedAt);
  assert.equal(record.clientApprovedBy, 'Meridian Contact');
});

test('old browser records normalize the retired en-route label', () => {
  const store = getStore();
  store.workOrders[0] = { ...store.workOrders[0], status: 'Technician En Route' };
  saveStore(store);
  assert.equal(getStore().workOrders[0].status, 'Dispatched');
});
