"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_profile_data_update_profile_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_profile_data_update_profile_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/profile_data/update_profile.js":
/*!***************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/profile_data/update_profile.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = (req, res) => {\n    let acc_details = req.body;\n    let query = this.generate_update_query(\"User_Accounts\", acc_details, {\n      \"email\": acc_details.email\n    });\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error updating profile data\"\n        });\n      } else if (result.affectedRows === 0) {\n        res.json({\n          message: \"No account found\"\n        });\n      } else {\n        res.json({\n          message: \"Profile data updated!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/profile_data/update_profile.js?");

/***/ })

};
;