"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_get_web_pages_entry_page_entry_js";
exports.ids = ["Development_Server_Requests_requests_get_web_pages_entry_page_entry_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/get_web_pages/entry_page/entry.js"
/*!********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/get_web_pages/entry_page/entry.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction request() {\n  this.req = (req, res) => {\n    try {\n      const entry_page = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(`${__dirname}/entry.html`, 'utf8');\n      res.send(entry_page);\n    } catch (err) {\n      console.log(err);\n    }\n    res.end();\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/get_web_pages/entry_page/entry.js?\n}");

/***/ }

};
;