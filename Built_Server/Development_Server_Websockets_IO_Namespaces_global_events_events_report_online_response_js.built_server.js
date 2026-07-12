"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_global_events_events_report_online_response_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_global_events_events_report_online_response_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/global_events/events/report_online_response.js"
/*!****************************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/global_events/events/report_online_response.js ***!
  \****************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = ({\n    user_account,\n    followings\n  }) => {\n    let {\n      id: self_id\n    } = user_account;\n    let self_socket = this.online_users[self_id]?.socket;\n    for (let following of followings) {\n      let {\n        id\n      } = following;\n      if (!this.online_users[id]) {\n        continue;\n      }\n      self_socket.emit(\"add_online_user\", {\n        online_user: following\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/global_events/events/report_online_response.js?\n}");

/***/ }

};
;