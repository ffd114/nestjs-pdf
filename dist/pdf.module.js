"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.PDFModule = void 0;
var common_1 = require("@nestjs/common");
var pdf_service_1 = require("./pdf.service");
var pdf_constants_1 = require("./pdf.constants");
var PDFModule = (function () {
    function PDFModule() {
    }
    PDFModule_1 = PDFModule;
    PDFModule.register = function (options) {
        return {
            global: options.isGlobal,
            module: PDFModule_1,
            providers: [
                {
                    provide: pdf_constants_1.PDF_OPTIONS_TOKEN,
                    useValue: options
                },
            ]
        };
    };
    PDFModule.registerAsync = function (options) {
        return {
            global: options.isGlobal,
            module: PDFModule_1,
            providers: __spreadArray([], PDFModule_1.createAsyncProviders(options), true),
            imports: options.imports || []
        };
    };
    PDFModule.createAsyncProviders = function (options) {
        if (options.useFactory || options.useExisting) {
            return [PDFModule_1.createAsyncOptionsProvider(options)];
        }
        var useClass = options.useClass;
        return [
            PDFModule_1.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass: useClass
            },
        ];
    };
    PDFModule.createAsyncOptionsProvider = function (options) {
        if (options.useFactory) {
            return {
                provide: pdf_constants_1.PDF_OPTIONS_TOKEN,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        var inject = [
            (options.useClass ||
                options.useExisting),
        ];
        return {
            provide: pdf_constants_1.PDF_OPTIONS_TOKEN,
            useFactory: function (factory) {
                return factory.createPdfOptions();
            },
            inject: inject
        };
    };
    var PDFModule_1;
    PDFModule = PDFModule_1 = __decorate([
        (0, common_1.Module)({
            providers: [pdf_service_1.PDFService],
            exports: [pdf_service_1.PDFService]
        })
    ], PDFModule);
    return PDFModule;
}());
exports.PDFModule = PDFModule;
