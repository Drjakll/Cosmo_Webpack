"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_webrtc_events_send_local_description_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_webrtc_events_send_local_description_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/webrtc/events/send_local_description.js":
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/webrtc/events/send_local_description.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = data => {\n    let {\n      to,\n      from,\n      local_description\n    } = data;\n    this.io.to[to.id].emit('receive_local_description', {\n      from: from,\n      local_description: local_description\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/webrtc/events/send_local_description.js?");

/***/ })

};
;