export const WORK_ORDER_STATUSES = Object.freeze([
  'NEW',
  'PENDING_REVIEW',
  'ASSIGNED',
  'DISPATCHED',
  'IN_PROGRESS',
  'ON_HOLD',
  'WAITING_FOR_PARTS',
  'COMPLETED',
  'CLIENT_APPROVAL',
  'CLOSED',
  'CANCELLED'
]);

export const WORK_ORDER_TRANSITIONS = Object.freeze({
  NEW: Object.freeze(['PENDING_REVIEW', 'CANCELLED']),
  PENDING_REVIEW: Object.freeze(['ASSIGNED', 'ON_HOLD', 'CANCELLED']),
  ASSIGNED: Object.freeze(['DISPATCHED', 'IN_PROGRESS', 'ON_HOLD', 'CANCELLED']),
  DISPATCHED: Object.freeze(['IN_PROGRESS', 'ON_HOLD']),
  IN_PROGRESS: Object.freeze(['COMPLETED', 'ON_HOLD', 'WAITING_FOR_PARTS']),
  ON_HOLD: Object.freeze(['IN_PROGRESS', 'WAITING_FOR_PARTS', 'CANCELLED']),
  WAITING_FOR_PARTS: Object.freeze(['IN_PROGRESS', 'ON_HOLD']),
  COMPLETED: Object.freeze(['CLIENT_APPROVAL', 'IN_PROGRESS']),
  CLIENT_APPROVAL: Object.freeze(['CLOSED', 'IN_PROGRESS']),
  CLOSED: Object.freeze([]),
  CANCELLED: Object.freeze([])
});

export function isWorkOrderStatus(status) {
  return WORK_ORDER_STATUSES.includes(status);
}

export function canTransitionWorkOrder(from, to) {
  return WORK_ORDER_TRANSITIONS[from]?.includes(to) ?? false;
}

export function canClientUpdateWorkOrder(status, currentStatus, createdById, userId) {
  const canCancelOwnNewRequest = status === 'CANCELLED' && currentStatus === 'NEW' && createdById === userId;
  const canApproveCompletedRequest = status === 'CLOSED' && currentStatus === 'CLIENT_APPROVAL';
  return canCancelOwnNewRequest || canApproveCompletedRequest;
}
