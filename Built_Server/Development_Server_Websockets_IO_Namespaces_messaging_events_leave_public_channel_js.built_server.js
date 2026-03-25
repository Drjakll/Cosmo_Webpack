"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_leave_public_channel_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_leave_public_channel_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/leave_public_channel.js"
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/leave_public_channel.js ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    channel_obj,\n    user_id\n  }) => {\n    let {\n      channel_name\n    } = channel_obj;\n    this.socket.leave(channel_name);\n    delete this.public_channel_list[channel_name]?.online_users?.[user_id];\n    let online_users = this.public_channel_list[channel_name]?.online_users || {};\n    if (Object.keys(online_users).length === 0) {\n      channel_obj.key = channel_name;\n      this.channel_storage.Delete_Entry(channel_obj);\n      delete this.public_channel_list[channel_name];\n    } else {\n      this.io.to(channel_name).emit('update_public_online_users', {\n        online_users,\n        channel_name\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/leave_public_channel.js?\n}");

/***/ }

};
;