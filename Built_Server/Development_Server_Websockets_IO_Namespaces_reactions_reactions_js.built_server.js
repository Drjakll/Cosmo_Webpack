/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_reactions_reactions_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_reactions_reactions_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/reactions/events lazy recursive ^\\.\\/.*$":
/*!******************************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/reactions/events/ lazy ^\.\/.*$ namespace object ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{var map = {\n\t\"./join_reaction_room\": [\n\t\t\"./Development/Server/Websockets/IO_Namespaces/reactions/events/join_reaction_room.js\",\n\t\t\"Development_Server_Websockets_IO_Namespaces_reactions_events_join_reaction_room_js\"\n\t],\n\t\"./join_reaction_room.js\": [\n\t\t\"./Development/Server/Websockets/IO_Namespaces/reactions/events/join_reaction_room.js\",\n\t\t\"Development_Server_Websockets_IO_Namespaces_reactions_events_join_reaction_room_js\"\n\t],\n\t\"./signal_all_refresh_reactions\": [\n\t\t\"./Development/Server/Websockets/IO_Namespaces/reactions/events/signal_all_refresh_reactions.js\",\n\t\t\"Development_Server_Websockets_IO_Namespaces_reactions_events_signal_all_refresh_reactions_js\"\n\t],\n\t\"./signal_all_refresh_reactions.js\": [\n\t\t\"./Development/Server/Websockets/IO_Namespaces/reactions/events/signal_all_refresh_reactions.js\",\n\t\t\"Development_Server_Websockets_IO_Namespaces_reactions_events_signal_all_refresh_reactions_js\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__(id);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./Development/Server/Websockets/IO_Namespaces/reactions/events lazy recursive ^\\\\.\\\\/.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/reactions/events/_lazy_^\\.\\/.*$_namespace_object?\n}");

/***/ }),

/***/ "./Development/Server/Websockets/IO_Namespaces/reactions/reactions.js":
/*!****************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/reactions/reactions.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nlet Wrapper = function () {\n  (async () => {\n    this.events = {};\n    let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/reactions/events/`;\n    let entries = await fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(path);\n    for await (let entry of entries) {\n      let sub_path = `${path}${entry}`;\n      const is_not_dir = !fs__WEBPACK_IMPORTED_MODULE_0___default().lstatSync(sub_path).isDirectory();\n      if (is_not_dir && entry.split('.')[1] === 'js') {\n        let key = entry.split('.')[0];\n        this.events[key] = await __webpack_require__(\"./Development/Server/Websockets/IO_Namespaces/reactions/events lazy recursive ^\\\\.\\\\/.*$\")(`./${entry}`);\n        this.events[key] = this.events[key].default;\n      }\n    }\n  })();\n  this.namespace = socket => {\n    let events = {};\n    for (let i in this.events) {\n      events[i] = new this.events[i]();\n      events[i].socket = socket;\n      events[i].root_io = this.root_io;\n      events[i].io = this.io;\n    }\n    socket.on('join_reaction_room', events.join_reaction_room.event);\n    socket.on('signal_all_refresh_reactions', events.signal_all_refresh_reactions.event);\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/reactions/reactions.js?\n}");

/***/ })

};
;