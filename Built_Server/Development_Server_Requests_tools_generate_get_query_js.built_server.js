"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_tools_generate_get_query_js";
exports.ids = ["Development_Server_Requests_tools_generate_get_query_js"];
exports.modules = {

/***/ "./Development/Server/Requests/tools/generate_get_query.js":
/*!*****************************************************************!*\
  !*** ./Development/Server/Requests/tools/generate_get_query.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet generate_query = (table_name, requirements, data_to_get) => {\n  let get_types_of_data = types => {\n    if (types === '*') {\n      return types;\n    }\n    let sub_query = '';\n    for (let type of types) {\n      sub_query += `${type},`;\n    }\n    sub_query = sub_query.substr(0, -1);\n    return sub_query;\n  };\n  let generate_json_search = (column_name, obj) => {\n    let sub_query = ``;\n    for (let i in obj) {\n      sub_query += ` json_search(${column_name}, 'all', '%${obj[i]}%, null, '$[*].\"${i}\"') and`;\n    }\n    return sub_query.substr(0, -4);\n  };\n  let query = `select ${get_types_of_data(data_to_get)} from ${table_name}`;\n  if (requirements.length > 0) {\n    //Only add \"where\" clause if there is any requirement\n    query += ` where `;\n  }\n  for (let req of requirements) {\n    let key = req.key;\n    let type = req.type;\n    let value = req.value;\n    let conjuc = req.conjunc;\n    switch (type) {\n      case \"string\":\n        query += `${key} ${conjuc} '${value} and`;\n        break;\n      case \"number\":\n        query += `${key} ${conjuc} ${value} and`;\n        break;\n      case \"range\":\n        query += `${key} ${conjuc} ${value} and`;\n        break;\n      case 'json':\n        if (Object.keys(value).length === 0) {\n          continue;\n        }\n        query += `${generate_json_search(key, value)} and`;\n        break;\n    }\n  }\n\n  //If no requirement(s) is set, then don't subtract \" and\" at the end of the query\n  query = requirements.length > 0 ? query.substr(0, -4) : query;\n  return query;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generate_query);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/tools/generate_get_query.js?");

/***/ })

};
;