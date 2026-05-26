"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_create_account_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_create_account_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/create_account.js"
/*!******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/create_account.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  const Verify_Email = function (email) {\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return emailRegex.test(email);\n  };\n  this.req = async (req, res) => {\n    let acc_details = req.body;\n    let {\n      email,\n      password,\n      first_name,\n      last_name,\n      date_of_birth,\n      gender,\n      marital_status\n    } = acc_details;\n    if (!Verify_Email(email)) {\n      res.json({\n        message: \"Invalid email format.\",\n        success: false,\n        acc_info: null\n      });\n      return;\n    }\n    let created_on = Date.now();\n    let query = `insert into User_Accounts(email, password, first_name, last_name, date_of_birth, gender, marital_status, created_on) values(?,?,?,?,?,?,?,?);`;\n    try {\n      let [result] = await this.sql.query(query, [email, password, first_name, last_name, date_of_birth, gender, marital_status, created_on]);\n      acc_details.id = result.insertId;\n      res.json({\n        message: \"Account successfully created.\",\n        success: true,\n        acc_info: acc_details\n      });\n    } catch (err) {\n      console.log(query, err.sqlMessage);\n      res.json({\n        message: \"Error creating the account.\",\n        success: false,\n        acc_info: null\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/create_account.js?\n}");

/***/ }

};
;