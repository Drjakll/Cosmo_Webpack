"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_profile_data_get_user_table_data_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_profile_data_get_user_table_data_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/profile_data/get_user_table_data.js":
/*!********************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/profile_data/get_user_table_data.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    //at_index, table_names and acc_info only exist if it's retrieving data from login\n    let {\n      table_name,\n      user_id,\n      acc_info,\n      at_index,\n      table_names\n    } = req.body;\n    if (!table_name || !user_id) {\n      res.json({\n        message: \"Invalid table name or user_id\",\n        results: []\n      });\n      return;\n    }\n    let query = `select * from ${table_name} where user_id = ?`;\n    try {\n      let [results] = await this.sql.query(query, [user_id]);\n\n      //If anyone of these doesn't exist, then the request must be coming from need only one table\n      if (at_index === undefined || !table_names || !acc_info) {\n        res.json({\n          message: \"Successfully retrieved results\",\n          results\n        });\n      } else {\n        acc_info[table_name] = results;\n        at_index++;\n        table_name = table_names[at_index];\n        if (at_index === table_names?.length) {\n          return res.json({\n            message: \"Successfully retrieved account information\",\n            acc_info,\n            status: 0b11\n          });\n        }\n        req.body.at_index = at_index;\n        req.body.table_name = table_name;\n        next();\n      }\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error while retrieving results\",\n        results: []\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/profile_data/get_user_table_data.js?\n}");

/***/ })

};
;