/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_global_events_global_events_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_global_events_global_events_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/global_events/events lazy recursive ^\\.\\/.*$"
/*!**********************************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/global_events/events/ lazy ^\.\/.*$ namespace object ***!
  \**********************************************************************************************************/
(module) {

eval("{function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./Development/Server/Websockets/IO_Namespaces/global_events/events lazy recursive ^\\\\.\\\\/.*$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/global_events/events/_lazy_^\\.\\/.*$_namespace_object?\n}");

/***/ },

/***/ "./Development/Server/Websockets/IO_Namespaces/global_events/global_events.js"
/*!************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/global_events/global_events.js ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nlet Wrapper = function () {\n  (async () => {\n    this.events = {};\n    let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/global_events/events/`;\n    let entries = await fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(path);\n    for await (let entry of entries) {\n      let sub_path = `${path}${entry}`;\n      const is_not_dir = !fs__WEBPACK_IMPORTED_MODULE_0___default().lstatSync(sub_path).isDirectory();\n      if (is_not_dir && entry.split('.')[1] === 'js') {\n        let key = entry.split('.')[0];\n        this.events[key] = await __webpack_require__(\"./Development/Server/Websockets/IO_Namespaces/global_events/events lazy recursive ^\\\\.\\\\/.*$\")(`./${entry}`);\n        this.events[key] = this.events[key].default;\n      }\n    }\n  })();\n  this.namespace = socket => {\n    let events = {};\n    for (let i in this.events) {\n      events[i] = new this.events[i]();\n      events[i].socket = socket;\n      events[i].root_io = this.root_io;\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/global_events/global_events.js?\n}");

/***/ }

};
;