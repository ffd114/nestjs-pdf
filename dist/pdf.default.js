"use strict";
exports.__esModule = true;
exports.defaultCreateOptions = void 0;
var path_1 = require("path");
var os_1 = require("os");
exports.defaultCreateOptions = {
    filename: (0, path_1.join)((0, os_1.tmpdir)(), "html-pdf-".concat(process.pid, ".pdf"))
};
