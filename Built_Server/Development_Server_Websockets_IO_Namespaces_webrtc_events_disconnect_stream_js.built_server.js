"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_webrtc_events_disconnect_stream_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_webrtc_events_disconnect_stream_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/webrtc/events/disconnect_stream.js":
/*!****************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/webrtc/events/disconnect_stream.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = reason => {\n    //If this isn't a host that got disconnected, don't do anything else\n    if (this.active_streams[this.my_socket.id] === undefined) {\n      return;\n    }\n    delete this.active_streams[this.my_socket.id];\n    this.io.emit('update_stream_list', {\n      streams: this.active_streams\n    });\n    this.my_socket.to(this.my_socket.id).emit('leave_stream', {\n      msg: \"The host has disconnected from the stream.\"\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/webrtc/events/disconnect_stream.js?");

/***/ })

};
;