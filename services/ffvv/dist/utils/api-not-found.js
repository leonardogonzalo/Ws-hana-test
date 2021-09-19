"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async (ctx, next) => {
  try {
    await next();

    if (ctx.status === 404) {
      ctx.body = {
        code: ctx.status,
        message: "Not Found",
        data: {}
      };
      ctx.status = 404;
    }
  } catch (err) {
    ctx.throw(500, err.message, err);
  }
};

exports.default = _default;