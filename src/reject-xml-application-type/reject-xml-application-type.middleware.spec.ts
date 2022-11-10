import { RejectXmlApplicationTypeMiddleware } from './reject-xml-application-type.middleware';
import { Request, Response, NextFunction } from 'express';
import { rejectXmlApplicationTypeResponseMessage } from './reject-xml-application-type-response.message';

describe('RejectXmlApplicationTypeMiddleware', () => {
  let next: NextFunction;
  let req: Request;
  let res: Response;
  beforeEach(() => {
    next = jest.fn();
    req = { headers: {} } as Request;
    res = {} as Response;
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
  });
  it('should be defined', () => {
    expect(new RejectXmlApplicationTypeMiddleware()).toBeDefined();
  });
  it('it should send 406 status with error message if accpet is application/xml', () => {
    req.headers['accept'] = 'application/xml';
    const middleware = new RejectXmlApplicationTypeMiddleware();
    middleware.use(req, res, next);
    expect(res.status).toHaveBeenCalledWith(406);
    expect(res.json).toHaveBeenCalledWith(
      rejectXmlApplicationTypeResponseMessage,
    );
  });
  it('it should call next', () => {
    req.headers['accept'] = 'application/json';
    const middleware = new RejectXmlApplicationTypeMiddleware();
    middleware.use(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
