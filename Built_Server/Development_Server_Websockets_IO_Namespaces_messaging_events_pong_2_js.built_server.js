"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_pong_2_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_pong_2_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/pong_2.js"
/*!********************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/pong_2.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    user_account\n  }) => {\n    let {\n      id\n    } = user_account;\n\n    //If it got disconnected, this will be reconnecting...\n    if (!this.user_socket[id]) {\n      this.user_socket[id] = this.socket;\n      this.socket.emit('reconnect_all_rooms', {});\n    }\n    this.socket.last_pinged = Date.now();\n    this.socket.emit('pong', {});\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/pong_2.js?\n}");

/***/ }

};
;