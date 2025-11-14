"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_ping_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_ping_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/ping.js":
/*!******************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/ping.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    user_account,\n    room_tags\n  }) => {\n    let {\n      email\n    } = user_account;\n\n    //If it got disconnected, this will be reconnecting...\n    if (!this.email_socket[email]) {\n      this.email_socket[email] = this.socket;\n      this.socket.emit('reconnect_all_rooms', {});\n      /*\n        for(let i in room_tags.private){\n           let room_name = room_tags.private[i];\n           this.socket.join(room_name);\n           //The reason why massive_send_out is true is because this report is sent out to the mass amount of users\n          this.socket.to(room_name).emit('report_private_online', {email, room_tag: room_name, massive_send_out: true});\n      }\n       for(let i in room_tags.public){\n           let public_room_name = room_tags.public[i];\n           this.socket.join(public_room_name);\n           this.public_channel_list[public_room_name].online_users[email] = user_account;\n           let online_users = this.public_channel_list[public_room_name].online_users;\n           this.socket.to(public_room_name).emit('update_public_online_users', {channel_name: public_room_name, online_users: online_users || {}});\n      }\n      */\n    }\n    this.socket.last_pinged = Date.now();\n    this.socket.emit('pong', {});\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/ping.js?\n}");

/***/ })

};
;