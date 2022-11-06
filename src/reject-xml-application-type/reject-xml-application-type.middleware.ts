import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { rejectXmlApplicationTypeResponseMessage } from './reject-xml-application-type-response.message';
@Injectable()
export class RejectXmlApplicationTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (this.isXmlApplicationType(req)) {
      return res.status(406).json(rejectXmlApplicationTypeResponseMessage);
    }
    next();
  }

  private isXmlApplicationType(req: Request): boolean {
    return req.headers['accept'] == 'application/xml';
  }
}
