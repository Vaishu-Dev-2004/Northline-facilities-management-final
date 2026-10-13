import { HttpError } from '../utils/httpError.js';

export function validate(schema, source = 'body') {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message }));
      return next(new HttpError(422, 'Please check the submitted information.', errors));
    }
    req.validated = { ...(req.validated || {}), [source]: parsed.data };
    if (source === 'body') req.body = parsed.data;
    next();
  };
}
