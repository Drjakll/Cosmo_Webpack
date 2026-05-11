"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_live_streaming_events_leave_stream_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_live_streaming_events_leave_stream_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/live_streaming/events/leave_stream.js"
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/live_streaming/events/leave_stream.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = async room_tag => {\n    if (!room_tag) {\n      return;\n    }\n    let {\n      is_host,\n      stream_id\n    } = room_tag;\n\n    //If this isn't a host that got disconnected, don't do anything else\n    if (!is_host) {\n      delete this.my_socket.tag;\n      this.my_socket.to(stream_id).emit('leave_room', {\n        tag: room_tag\n      });\n      this.my_socket.to(stream_id).emit('leave_chat_room', {\n        room_tag: room_tag\n      });\n      this.my_socket.leave(stream_id);\n      if (this.all_sockets[stream_id]) {\n        delete this.all_sockets[stream_id][room_tag?.id];\n      }\n      return;\n    }\n\n    //await this.Delete_Active_Stream(room_tag);\n\n    room_tag.key = room_tag.id;\n    await this.storage.Delete_Entry(room_tag);\n    this.io.emit('update_stream_list', {\n      streams: {}\n    });\n    delete this.my_socket.tag;\n    this.my_socket.to(stream_id).emit('disband_room', {\n      msg: \"The host has disconnected from the stream.\"\n    });\n    this.my_socket.leave(stream_id);\n    delete this.all_sockets[stream_id];\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/live_streaming/events/leave_stream.js?\n}");

/***/ }

};
;