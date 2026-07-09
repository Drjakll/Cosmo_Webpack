"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_global_events_events_disconnect_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_global_events_events_disconnect_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/global_events/events/disconnect.js"
/*!****************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/global_events/events/disconnect.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = () => {\n    let {\n      id: socket_id\n    } = this.socket;\n    let user_object = this.online_users_socket[socket_id];\n    if (!user_object) {\n      return;\n    }\n    let {\n      user_account,\n      followers\n    } = user_object;\n    for (let i in followers) {\n      let {\n        id: follower_id\n      } = followers[i];\n      let follower_socket = this.online_users[follower_id]?.socket;\n      if (!follower_socket) {\n        continue;\n      }\n      follower_socket?.emit(\"remove_offline_user\", {\n        offline_user: user_account\n      });\n    }\n    delete this.online_users[user_account.id];\n    delete this.online_users_socket[socket_id];\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/global_events/events/disconnect.js?\n}");

/***/ }

};
;