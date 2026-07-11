"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_security_recover_account_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_security_recover_account_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/security/recover_account.js"
/*!****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/security/recover_account.js ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request({\n  sql\n}) {\n  this.req_path = '/recover_account';\n  this.req_type = 'post';\n  this.callbacks = ['recover_account', 'send_email'];\n  this.req = async (req, res, next) => {\n    let {\n      email\n    } = req.body;\n    let current_time = Date.now();\n    let get_query = `select email, first_name, last_name, last_time_recovered, password from User_Accounts where email = ?`;\n    try {\n      let [results] = await sql.query(get_query, [email]);\n      if (results.length === 0) {\n        res.json({\n          message: \"No account found with that email\",\n          failed: true\n        });\n        return;\n      }\n      let {\n        first_name,\n        last_name,\n        last_time_recovered,\n        password\n      } = results[0];\n      let seconds_since_last_recovery = Math.floor((current_time - last_time_recovered) / 1000);\n\n      //Check if the last time recovered is less than 60 seconds ago\n      if (seconds_since_last_recovery < 60) {\n        res.json({\n          message: `Wait for ${60 - seconds_since_last_recovery} seconds before \\nrecovering your account again`,\n          failed: true\n        });\n        return;\n      }\n\n      //Query for setting the last time recovered to the current time\n      let set_query = `update User_Accounts set last_time_recovered = ? where email = ?`;\n      await sql.query(set_query, [current_time, email]);\n\n      //Set the email message and response message for the next callback\n      req.body.mail_message = `Hello ${first_name} ${last_name},\\n\\nYour Cosmo account password is: <b>${password}</b>`;\n      req.body.response_msg = \"Your account details have been sent to your email\";\n      next();\n    } catch (error) {\n      console.error(\"Error occurred while recovering account:\", error);\n      res.status(500).json({\n        message: \"Internal server error\",\n        failed: true\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/security/recover_account.js?\n}");

/***/ }

};
;