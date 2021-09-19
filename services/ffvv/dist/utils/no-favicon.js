"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async (ctx, next) => {
  if (ctx.request.url === "/favicon.ico") {
    ctx.status = 204;
    return;
  }

  await next();
};

exports.default = _default;