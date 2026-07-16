import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// CurrentUser() - to get the currenct user details after authenticating    ;
export const CurrentUser = createParamDecorator(
    // ExecutionContext - similar to req,res,next in express
    (data: unknown, context: ExecutionContext) => {
        //switchToHttp - asking for HTTP request    
        // getRequest - its like req in express    
        const request = context.switchToHttp().getRequest()

        return request.user;
    }
)