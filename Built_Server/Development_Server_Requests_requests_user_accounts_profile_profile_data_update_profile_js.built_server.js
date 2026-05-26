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

/***/ "./Development/Server/Requests/requests/user_accounts/profile/profile_data/update_profile.js"
/*!***************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/profile_data/update_profile.js ***!
  \***************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      to_update,\n      credentials\n    } = req.body;\n    let {\n      password,\n      id\n    } = credentials;\n    if (Object.keys(to_update).length === 0 || !password || isNaN(parseInt(id))) {\n      res.json({\n        message: \"Credentials not found\",\n        success: 0\n      });\n      return;\n    }\n    let query = `update User_Accounts set ? where password = ? and id = ?`;\n    try {\n      await this.sql.query(query, [to_update, password, id]);\n      res.json({\n        message: \"Successfully updated the account\",\n        success: 1\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error while updating\",\n        success: 0\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/profile_data/update_profile.js?\n}");

/***/ }

};
;