"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PDFService = void 0;
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var juice_1 = __importDefault(require("juice"));
var lodash_omit_1 = __importDefault(require("lodash.omit"));
var lodash_merge_1 = __importDefault(require("lodash.merge"));
var consolidate_1 = __importDefault(require("consolidate"));
var operators_1 = require("rxjs/operators");
var common_1 = require("@nestjs/common");
var html_pdf_1 = __importDefault(require("html-pdf"));
var pdf_constants_1 = require("./pdf.constants");
var pdf_default_1 = require("./pdf.default");
var PDFService = (function () {
    function PDFService(moduleOptions) {
        this.moduleOptions = moduleOptions;
    }
    PDFService.prototype.toFile = function (template, filename, options, scheduler) {
        var _this = this;
        if (scheduler === void 0) { scheduler = rxjs_1.asapScheduler; }
        return this.makeHtmlRender(template, options).pipe((0, operators_1.mergeMap)(function (html) {
            var create = _this.create(html, options);
            return (0, rxjs_1.bindNodeCallback)(create.toFile.bind(create), scheduler)(filename);
        }));
    };
    PDFService.prototype.toStream = function (template, options, scheduler) {
        var _this = this;
        if (scheduler === void 0) { scheduler = rxjs_1.asapScheduler; }
        return this.makeHtmlRender(template, options).pipe((0, operators_1.mergeMap)(function (html) {
            var create = _this.create(html, options);
            return (0, rxjs_1.bindNodeCallback)(create.toStream.bind(create), scheduler)();
        }));
    };
    PDFService.prototype.toBuffer = function (template, options, scheduler) {
        var _this = this;
        if (scheduler === void 0) { scheduler = rxjs_1.asapScheduler; }
        return this.makeHtmlRender(template, options).pipe((0, operators_1.mergeMap)(function (html) {
            var create = _this.create(html, options);
            return (0, rxjs_1.bindNodeCallback)(create.toBuffer.bind(create), scheduler)();
        }));
    };
    PDFService.prototype.create = function (html, options) {
        return html_pdf_1["default"].create(html, (0, lodash_merge_1["default"])(pdf_default_1.defaultCreateOptions, (0, lodash_omit_1["default"])(options, 'locals')));
    };
    PDFService.prototype.makeHtmlRender = function (template, options) {
        var _this = this;
        var path = this.getTemplatePath(template, this.moduleOptions.view);
        return this.generateHtmlFromTemplate(path, this.moduleOptions.view, options === null || options === void 0 ? void 0 : options.locals).pipe((0, operators_1.mergeMap)(function (html) {
            return (0, rxjs_1.of)(_this.prepareHtmlTemplate(html));
        }));
    };
    PDFService.prototype.getTemplatePath = function (template, _a) {
        var root = _a.root, extension = _a.extension, engine = _a.engine;
        return (0, path_1.join)(root, "".concat(template, ".").concat(extension || engine));
    };
    PDFService.prototype.generateHtmlFromTemplate = function (template, _a, locals) {
        var engine = _a.engine, engineOptions = _a.engineOptions;
        return (0, rxjs_1.bindNodeCallback)(consolidate_1["default"][engine], rxjs_1.asapScheduler)(template, Object.assign({}, locals, engineOptions));
    };
    PDFService.prototype.prepareHtmlTemplate = function (html) {
        return (0, juice_1["default"])(html, this.moduleOptions.juice);
    };
    PDFService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(pdf_constants_1.PDF_OPTIONS_TOKEN)),
        __metadata("design:paramtypes", [Object])
    ], PDFService);
    return PDFService;
}());
exports.PDFService = PDFService;
