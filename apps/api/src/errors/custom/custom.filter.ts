import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class CustomFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const logger = new Logger(CustomFilter.name)
    logger.error(exception)

    const res = host.switchToHttp().getResponse()

    let status = ""
    let message = ""
    let errors = ""

    if (exception.status == 403) {
      status = exception.status
      message = exception.response.message
      errors = exception.response.error

    } else {
      if (exception.cause && Array.isArray(exception.cause)) {
        exception.cause.forEach((c: any) => {
          logger.error(c)
        })
      } else {
        // console.log(exception)
        logger.error(exception.cause ? exception.cause : exception)
      }

      status = exception.status ?? 500
      message = exception.message
      errors = exception.cause
    }

    res.status(status).json({
      status,
      message,
      errors,
    })

  }
}
