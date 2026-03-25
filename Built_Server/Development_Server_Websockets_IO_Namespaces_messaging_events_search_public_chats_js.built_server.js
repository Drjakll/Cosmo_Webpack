"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_messaging_events_search_public_chats_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_messaging_events_search_public_chats_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/messaging/events/search_public_chats.js"
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/messaging/events/search_public_chats.js ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  this.event = async ({\n    search_req\n  }) => {\n    if (!search_req || Object.keys(search_req).length === 0) {\n      search_req = {\n        channel_name: \"\"\n      }; //Must have at least 1 requirement to find results\n    }\n    let results = await this.channel_storage.Search(search_req);\n    for (let i in results) {\n      let number_of_users = Object.keys(this.public_channel_list[results[i].channel_name]?.online_users || {}).length;\n      results[i].number_of_users = number_of_users;\n    }\n    this.socket.emit('catch_public_chats', {\n      channels: results\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/messaging/events/search_public_chats.js?\n}");

/***/ }

};
;