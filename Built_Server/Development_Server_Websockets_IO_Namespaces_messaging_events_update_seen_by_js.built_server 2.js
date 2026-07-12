"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_update_seen_by_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_update_seen_by_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/update_seen_by.js"
/*!****************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/update_seen_by.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    room_tag,\n    seen_by\n  }) => {\n    //Update everyone in the channel that it has seen by target\n    this.io.to(room_tag)?.emit('update_seen_by', {\n      room_tag,\n      seen_by\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/update_seen_by.js?\n}");

/***/ }

};
;