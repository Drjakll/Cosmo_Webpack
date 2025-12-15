"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_get_all_followings_js";
exports.ids = ["Development_Server_Requests_requests_connections_get_all_followings_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/get_all_followings.js":
/*!********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/get_all_followings.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      id: user_id\n    } = req.body;\n    let query = `\n            select \n                ua.* \n            from \n                Connections as c\n            join\n                User_Accounts as ua\n            where \n                c.follower_id = ${user_id} \n            and \n                c.followed_id = ua.id\n        `;\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error retrieving followings list\",\n          results: []\n        });\n      } else {\n        res.json({\n          message: \"Successfully retrieved followings list\",\n          results: results\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/get_all_followings.js?\n}");

/***/ })

};
;