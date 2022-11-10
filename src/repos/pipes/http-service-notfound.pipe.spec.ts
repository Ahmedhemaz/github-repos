import { NotFoundException } from '@nestjs/common';
import { HttpServiceNotfoundPipe } from './http-service-notfound.pipe';

describe('HttpServiceNotfoundPipe', () => {
  let value;
  it('should be defined', () => {
    expect(new HttpServiceNotfoundPipe()).toBeDefined();
  });

  it('should throw NotFoundexception', () => {
    value = {
      response: {
        status: 404,
      },
    };
    const httpServiceNotfoundPipe: HttpServiceNotfoundPipe =
      new HttpServiceNotfoundPipe();
    expect(() => httpServiceNotfoundPipe.transform(value)).toThrowError(
      new NotFoundException(),
    );
  });
  it('should return value', () => {
    value = {
      response: {
        status: 200,
      },
    };
    const httpServiceNotfoundPipe: HttpServiceNotfoundPipe =
      new HttpServiceNotfoundPipe();
    expect(httpServiceNotfoundPipe.transform(value)).toStrictEqual(value);
  });
});
