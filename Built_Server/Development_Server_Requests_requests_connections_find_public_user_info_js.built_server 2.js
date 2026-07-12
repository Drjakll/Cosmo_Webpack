"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_find_public_user_info_js";
exports.ids = ["Development_Server_Requests_requests_connections_find_public_user_info_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/find_public_user_info.js":
/*!***********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/find_public_user_info.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res, next) => {\n    let {\n      id\n    } = req.body;\n    let query = `\n            select \n                id,\n                first_name,\n                last_name,\n                profile_picture_link,\n                gender,\n                date_of_birth,\n                location_of_birth,\n                schools,\n                professions,\n                marital_status,\n                current_location,\n                relationships,\n                hobbies,\n                privacy\n            from \n                User_Accounts\n            where \n                id = ${id};\n        `;\n    this.sql.query(query, (err, result) => {\n      if (err || result.length === 0) {\n        console.log(query, err?.sqlMessage);\n        res.json({\n          message: \"Error getting user public information\"\n        });\n      } else {\n        req.body.user_account_info = result[0];\n        next();\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/find_public_user_info.js?\n}");

/***/ })

};
;