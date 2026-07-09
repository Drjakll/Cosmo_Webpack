"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_send_report_offline_dc_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_send_report_offline_dc_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/send_report_offline_dc.js"
/*!************************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/send_report_offline_dc.js ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = () => {\n    let user_id = this.socket.user_id;\n    let user_private_rooms = this.socket?.private.rooms_joined;\n    let user_public_rooms = this.socket?.public.rooms_joined;\n    for (let i in user_private_rooms) {\n      let room_tag = parseInt(user_private_rooms[i]);\n      this.io.to(room_tag).emit('report_private_offline', {\n        room_tag,\n        user_id: user_id\n      });\n    }\n    for (let i in user_public_rooms) {\n      let room_tag = user_public_rooms[i];\n      this.io.to(room_tag).emit('report_public_offline', {\n        room_tag,\n        user_id: user_id\n      });\n    }\n    delete this.user_socket[user_id];\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/send_report_offline_dc.js?\n}");

/***/ }

};
;