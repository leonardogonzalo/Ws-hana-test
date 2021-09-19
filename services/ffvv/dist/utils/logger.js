"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (ctx, next) => {
  await _logger.default.create(ctx.req, async () => {
    try {
      await next();
      ctx.req.params = ctx.params;

      _logger.default.done(`Completed`, ctx, ctx.body);
    } catch (exception) {
      _logger.default.failed(exception, ctx.res);

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

exports.default = _default;