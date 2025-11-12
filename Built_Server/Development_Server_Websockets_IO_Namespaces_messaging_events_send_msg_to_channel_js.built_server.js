"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_send_msg_to_channel_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_send_msg_to_channel_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/send_msg_to_channel.js":
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/send_msg_to_channel.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    room_tag,\n    msg_obj,\n    private_or_public\n  }) => {\n    msg_obj.timestamp = Date.now();\n    this.io.to(room_tag)?.emit('receive_msg', {\n      room_tag,\n      msg_obj,\n      private_or_public\n    });\n\n    //Only save conversation if it's a private one, public conversation will not be saved into database\n    if (private_or_public === \"private\") {\n      this.socket.emit('save_conversation', {\n        selected_room_tag: room_tag\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/send_msg_to_channel.js?\n}");

/***/ })

};
;