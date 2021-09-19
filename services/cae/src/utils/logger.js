import Logger from "@bbel/logger";

export default async (ctx, next) => {
  await Logger.create(ctx.req, async () => {
    try {
      await next();
      ctx.req.params = ctx.params;
      Logger.done(`Completed`, ctx, ctx.body);
    } catch (exception) {
      Logger.failed(exception, ctx.res);
      ctx.status = exception.statusCode || exception.status || 500;
      let message = ctx.status >= 500 ? "Internal Server Error" : exception.message;
      ctx.body = {
        code: ctx.status,
        message: message,
        data: {}
      };
      ctx.app.emit("error", exception, ctx);
    }
  });
};
