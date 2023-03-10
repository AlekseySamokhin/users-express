import type * as yup from 'yup';

import type { Request, Response, NextFunction } from 'express';

const validate = (schema: yup.AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validate;
