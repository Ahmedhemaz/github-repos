import { RejectXmlApplicationTypeMiddleware } from './reject-xml-application-type.middleware';

describe('RejectXmlApplicationTypeMiddleware', () => {
  it('should be defined', () => {
    expect(new RejectXmlApplicationTypeMiddleware()).toBeDefined();
  });
});
