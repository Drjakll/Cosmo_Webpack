"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_profile_data_add_item_to_profile_t-e494ff";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_profile_data_add_item_to_profile_t-e494ff"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/profile_data/add_item_to_profile_table.js"
/*!**************************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/profile_data/add_item_to_profile_table.js ***!
  \**************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      to_insert,\n      table_name\n    } = req.body;\n    let query = `insert into ${table_name} set ?`;\n    try {\n      let [result] = await this.sql.query(query, [to_insert]);\n      res.json({\n        message: \"Successfully added item to the profile table!\",\n        failed: 0,\n        id: result.insertId\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error while adding to profile table!\",\n        failed: 1,\n        id: null\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/profile_data/add_item_to_profile_table.js?\n}");

/***/ }

};
;