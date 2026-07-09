"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_global_events_events_report_offline_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_global_events_events_report_offline_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/global_events/events/report_offline.js"
/*!********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/global_events/events/report_offline.js ***!
  \********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    user_account,\n    followers\n  }) => {\n    if (!user_account) {\n      return;\n    }\n    let {\n      id\n    } = user_account;\n    delete this.online_users[id];\n\n    //Report to the user's followers that the user is online\n    for (let i in followers) {\n      let {\n        id: follower_id\n      } = followers[i];\n      let follower_socket = this.online_users[follower_id]?.socket;\n      if (!follower_socket) {\n        continue;\n      }\n      follower_socket?.emit(\"remove_offline_user\", {\n        offline_user: user_account\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/global_events/events/report_offline.js?\n}");

/***/ }

};
;