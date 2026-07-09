"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_live_streaming_events_new_viewer_joined_chat_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_live_streaming_events_new_viewer_joined_chat_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/live_streaming/events/new_viewer_joined_chat.js"
/*!*****************************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/live_streaming/events/new_viewer_joined_chat.js ***!
  \*****************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    room_tag,\n    account_data\n  }) => {\n    if (!room_tag) {\n      return;\n    }\n    let {\n      stream_id\n    } = room_tag;\n    if (Object.keys(this.all_sockets[stream_id]).length >= this.MAX_PERSONS_IN_STREAM) {\n      this.my_socket.emit('stream_full', {});\n      return;\n    }\n    this.my_socket.to(stream_id).emit('signal_new_viewer_joined_chat', {\n      room_tag: room_tag,\n      account_data\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/live_streaming/events/new_viewer_joined_chat.js?\n}");

/***/ }

};
;