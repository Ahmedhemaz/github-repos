import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

@Injectable()
export class HttpServiceNotfoundPipe implements PipeTransform {
  transform(value: any) {
    if (value.response.status == 404) {
      throw new NotFoundException();
    }
    return value;
  }
}
