"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_profile_data_remove_item_from_prof-822a0a";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_profile_data_remove_item_from_prof-822a0a"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/profile_data/remove_item_from_profile_table.js"
/*!*******************************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/profile_data/remove_item_from_profile_table.js ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/remove_item_from_profile_table\";\n  this.req_type = \"delete\";\n  this.callbacks = [\"remove_item_from_profile_table\"];\n  this.req = async (req, res) => {\n    let {\n      table_name,\n      id\n    } = req.query;\n    let query = `delete from ${table_name} where id = ?`;\n    try {\n      await sql.query(query, [id]);\n      res.json({\n        message: \"Successfully removed entry\",\n        success: 1\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error on removing entry\",\n        success: 0\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/profile_data/remove_item_from_profile_table.js?\n}");

/***/ }

};
;