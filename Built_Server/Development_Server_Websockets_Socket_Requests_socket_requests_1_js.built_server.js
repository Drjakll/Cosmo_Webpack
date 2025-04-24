"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_Socket_Requests_socket_requests_1_js";
exports.ids = ["Development_Server_Websockets_Socket_Requests_socket_requests_1_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/Socket_Requests/socket_requests_1.js":
/*!****************************************************************************!*\
  !*** ./Development/Server/Websockets/Socket_Requests/socket_requests_1.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nlet GatherRequests = async function (path, connectedClients, clientsID, io) {\n  let req_objs = {};\n  let entries = await fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(path);\n  for await (let file of entries) {\n    let subPath = `${path}${file}`;\n    const isDir = fs__WEBPACK_IMPORTED_MODULE_0___default().lstatSync(subPath).isDirectory();\n    if (isDir) {\n      req_objs[file] = await GatherRequests(subPath + \"/\", connectedClients, clientsID, io);\n    } else {\n      let key = file.split('.')[0];\n      req_objs[key] = await __webpack_require__(\"./Development/Server/Websockets/Socket_Requests lazy recursive ^\\\\.\\\\/.*$\")(\"./\" + subPath.split(\"Socket_Requests/\")[1]);\n      req_objs[key] = req_objs[key].default;\n      req_objs[key].prototype.connectedClients = connectedClients;\n      req_objs[key].prototype.clientsID = clientsID;\n      req_objs[key].io = io;\n      req_objs[key] = new req_objs[key]();\n    }\n  }\n  return req_objs;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GatherRequests);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/Socket_Requests/socket_requests_1.js?");

/***/ })

};
;