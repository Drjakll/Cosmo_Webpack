"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_global_events_events_report_update_followings_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_global_events_events_report_update_followings_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/global_events/events/report_update_followings.js"
/*!******************************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/global_events/events/report_update_followings.js ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    follower_acc,\n    following_acc = null\n  }) => {\n    let {\n      id\n    } = follower_acc;\n    let follower_socket = this.online_users[id].socket;\n    follower_socket?.emit(\"followings_update\", {\n      removed_following: following_acc\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/global_events/events/report_update_followings.js?\n}");

/***/ }

};
;