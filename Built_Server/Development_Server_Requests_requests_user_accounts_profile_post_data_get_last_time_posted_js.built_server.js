"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_post_data_get_last_time_posted_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_post_data_get_last_time_posted_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/get_last_time_posted.js":
/*!******************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/get_last_time_posted.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      user_id\n    } = req.body;\n    let query = `select * from Post_Data where user_id = '${user_id}'\n                                               order by created_on desc \n                                               limit 1`;\n    this.sql.query(query, (err, results) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          last_time_posted: null\n        });\n        return;\n      } else {\n        let last_posted = results.length === 0 ? Date.now() : results[0].created_on;\n        res.json({\n          last_time_posted: last_posted\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/get_last_time_posted.js?\n}");

/***/ })

};
;