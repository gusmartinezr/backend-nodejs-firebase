"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    var _a, _b, _c;
    const status = (_a = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _a !== void 0 ? _a : 500;
    const code = (_b = err === null || err === void 0 ? void 0 : err.code) !== null && _b !== void 0 ? _b : "INTERNAL_ERROR";
    const msg = (_c = err === null || err === void 0 ? void 0 : err.message) !== null && _c !== void 0 ? _c : "Unexpected error";
    res.status(status).json({ error: code, message: msg });
}
