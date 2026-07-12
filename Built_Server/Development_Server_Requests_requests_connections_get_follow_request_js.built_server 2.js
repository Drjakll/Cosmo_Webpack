"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_get_follow_request_js";
exports.ids = ["Development_Server_Requests_requests_connections_get_follow_request_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/get_follow_request.js":
/*!********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/get_follow_request.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      id\n    } = req.body;\n    let query = `\n            select \n                c.*,\n                ua.profile_picture_link,\n                ua.first_name,\n                ua.last_name\n            from \n                Connections as c\n            join\n                User_Accounts as ua\n            where \n                c.followed_id = ${id}\n            and\n                c.follower_id = ua.id\n            and\n                c.status = 'pending';   \n        `;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error retreiving follow requests\",\n          result: []\n        });\n      } else {\n        req.body.results = result;\n        next();\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/get_follow_request.js?\n}");

/***/ })

};
;