"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_post_data_create_post_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_post_data_create_post_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/create_post.js":
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/create_post.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      user_id,\n      body,\n      title\n    } = req.body;\n    let created_on = Date.now();\n    let data = [{\n      created_on,\n      user_id,\n      body,\n      title,\n      last_edited: time_stamp\n    }];\n    let query = `insert into Post_Data(title, body, user_id, created_on, last_edited) values ?`;\n    this.sql.query(query, [data], (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error adding new post\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully added new post\"\n        });\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/create_post.js?\n}");

/***/ })

};
;