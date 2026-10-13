export function success(res, data, message = 'Request completed successfully', status = 200, extra = {}) {
  return res.status(status).json({ success: true, data, message, ...extra });
}

export function fail(res, message, status = 400, errors = []) {
  return res.status(status).json({ success: false, message, errors });
}
