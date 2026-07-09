"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_utilities_get_frontend_file_dir_js";
exports.ids = ["Development_Server_Requests_requests_utilities_get_frontend_file_dir_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/utilities/get_frontend_file_dir.js"
/*!*********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/utilities/get_frontend_file_dir.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction request(sql, s3, PutObjectCommand) {\n  this.req_path = \"/get_frontend_file_dir\";\n  this.req_type = \"get\";\n  this.callbacks = [\"get_frontend_file_dir\"];\n  let root = `${__dirname}/../Development/Client/`;\n  const recursion = async (dir_paths, entry_obj, current_root) => {\n    for (let path of dir_paths) {\n      let isDir = (await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.lstat(current_root + path)).isDirectory();\n      if (isDir) {\n        let sub_paths = await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readdir(current_root + path);\n        entry_obj[path] = await recursion(sub_paths, {}, current_root + path + \"/\");\n      } else {\n        entry_obj[path] = path;\n      }\n    }\n    return entry_obj;\n  };\n  this.req = async (req, res) => {\n    let entries = await fs__WEBPACK_IMPORTED_MODULE_0___default().promises.readdir(root);\n    let entry_data = await recursion(entries, {}, root);\n    res.json({\n      entry_data\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/utilities/get_frontend_file_dir.js?\n}");

/***/ }

};
;