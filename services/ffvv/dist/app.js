"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _koa = _interopRequireDefault(require("koa"));

var _koaHelmet = _interopRequireDefault(require("koa-helmet"));

var _koaCompress = _interopRequireDefault(require("koa-compress"));

var _yenv = _interopRequireDefault(require("yenv"));

var _logger = _interopRequireDefault(require("@belcorp/logger"));

var _koaBasicAuth = _interopRequireDefault(require("koa-basic-auth"));

var _settings = _interopRequireDefault(require("./utils/settings"));

var _logger2 = _interopRequireDefault(require("./utils/logger"));

var _noFavicon = _interopRequireDefault(require("./utils/no-favicon"));

var _apiError = _interopRequireDefault(require("./utils/api-error"));

var _apiNotFound = _interopRequireDefault(require("./utils/api-not-found"));

var _api = _interopRequireDefault(require("./routes/api"));

var _logger3 = _interopRequireDefault(require("logger"));

var _hanaDbConnection = _interopRequireDefault(require("./repositories/dbConnection/hanaDbConnection"));

var _oracleDbConnection = _interopRequireDefault(require("./repositories/dbConnection/oracleDbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//require("../newrelic");
//import logger from "koa-logger";
const env = (0, _yenv.default)("env.yaml", {
  strict: false
});
const app = new _koa.default();
const PORT = env.PORT;
const l = new _logger.default.Builder().dir("ffvv").build();

_settings.default.initialize(env);

_logger3.default.configure(env.LOG);

_hanaDbConnection.default.configure(env.DB.HANA, _logger3.default);

_oracleDbConnection.default.configure(env.DB.ORACLE, _logger3.default);

if (Boolean(env.AUTH.enable) === true) {
  app.use(function* (next) {
    try {
      yield next;
    } catch (err) {
      if (401 === err.status) {
        this.status = 401;
        this.set("WWW-Authenticate", "Basic");
        this.body = "";
      } else {
        throw err;
      }
    }
  }).use((0, _koaBasicAuth.default)(env.AUTH.BASIC));
}

_http.default.createServer(app.use(_koaHelmet.default.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
})).use(_koaHelmet.default.hidePoweredBy()).use((0, _koaCompress.default)({
  threshold: 2048,
  flush: require("zlib").Z_SYNC_FLUSH
})) //.use(logger())
.use(_noFavicon.default).use(_apiNotFound.default).use(_apiError.default).use(_logger2.default).use(_api.default.routes()).use(_api.default.allowedMethods()).callback()).listen(PORT, "0.0.0.0", () => l.info(`Server listening on PORT: ${PORT}`)).on("error", err => l.error("Server error", err));

var _default = app;
exports.default = _default;