"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_Socket_Requests_socket_requests_webrtc_functions_response_js";
exports.ids = ["Development_Server_Websockets_Socket_Requests_socket_requests_webrtc_functions_response_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/Socket_Requests/socket_requests/webrtc_functions/response.js":
/*!****************************************************************************************************!*\
  !*** ./Development/Server/Websockets/Socket_Requests/socket_requests/webrtc_functions/response.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet socket_request = function () {\n  this.request = data => {\n    let {\n      to_id,\n      from,\n      answer\n    } = typeof data === \"string\" ? JSON.parse(data) : data;\n    let client = this.connectedClients[to_id];\n    client?.emit('handle_response', JSON.stringify({\n      answer: answer,\n      from: from\n    }));\n    console.log(`${to_id} handling the response from ${from}`);\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket_request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/Socket_Requests/socket_requests/webrtc_functions/response.js?");

/***/ })

};
;