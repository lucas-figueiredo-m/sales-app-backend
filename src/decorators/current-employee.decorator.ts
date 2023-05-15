import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedJwt } from '@salesapp/types';

export const CurrentEmployee = createParamDecorator<
  unknown,
  unknown,
  DecodedJwt
>((_: never, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  return req.user as DecodedJwt;
});
