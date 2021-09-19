"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      code: ctx.status,
      message: err.message,
      data: err.stack
    };
    ctx.app.emit("error", err, ctx);
  }
};

exports.default = _default;