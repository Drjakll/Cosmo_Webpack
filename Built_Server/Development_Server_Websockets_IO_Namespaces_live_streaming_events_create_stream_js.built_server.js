"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_live_streaming_events_create_stream_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_live_streaming_events_create_stream_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/live_streaming/events/create_stream.js":
/*!********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/live_streaming/events/create_stream.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = tag => {\n    let {\n      stream_id\n    } = tag;\n    this.my_socket.join(stream_id);\n    this.active_streams[stream_id] = tag;\n    this.my_socket.tag = tag;\n    this.io.emit('update_stream_list', {\n      streams: this.active_streams\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/live_streaming/events/create_stream.js?");

/***/ })

};
;