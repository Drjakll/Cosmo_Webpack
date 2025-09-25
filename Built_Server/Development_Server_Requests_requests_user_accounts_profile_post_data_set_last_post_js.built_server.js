"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_post_data_set_last_post_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_post_data_set_last_post_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/post_data/set_last_post.js":
/*!***********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/post_data/set_last_post.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let {\n      email\n    } = req.body;\n    let query = `select * from Post_Data where owner_email = '${email}'\n                                               order by date_created desc`;\n    this.sql.query(query, (err, results) => {\n      let query2 = \"\";\n      let timestamp = null;\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error retrieving post(s)\",\n          last_posted: null\n        });\n        res.end();\n        return;\n      } else if (results.length === 0) {\n        query2 = `update User_Accounts set last_posted = null where email = '${email}'`;\n      } else {\n        timestamp = this.generate_time_string(new Date(results[0].date_created));\n        query2 = `update User_Accounts set last_posted = '${timestamp}'\n                                                   where email = '${email}'`;\n      }\n      this.sql.query(query2, (err2, result) => {\n        if (err2) {\n          console.log(err2.sqlMessage);\n          res.json({\n            message: \"Error updating last posted\",\n            last_posted: null\n          });\n        } else if (result.affectedRows === 0) {\n          res.json({\n            message: \"No user found\"\n          });\n        } else {\n          res.json({\n            message: \"Successfully updated last posted\",\n            last_posted: timestamp\n          });\n        }\n        res.end();\n      });\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/post_data/set_last_post.js?\n}");

/***/ })

};
;