"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_security_send_verification_code_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_security_send_verification_code_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/security/send_verification_code.js"
/*!***********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/security/send_verification_code.js ***!
  \***********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request(sql, s3, PutObjectCommand) {\n  this.req_path = '/send_verification_code';\n  this.req_type = 'post';\n  this.callbacks = ['send_verification_code', 'send_email'];\n  let generate_code = n => {\n    let code = \"\";\n    for (let i = 0; i < n; i++) {\n      let random_num = Math.floor(Math.random() * 26) + 65;\n      code += String.fromCharCode(random_num);\n    }\n    return code;\n  };\n  this.req = async (req, res, next) => {\n    let {\n      id,\n      email\n    } = req.body;\n    let code = generate_code(6);\n    let query = `update User_Accounts set verification_code = ? where id = ? and email = ?`;\n    try {\n      let [result] = await sql.query(query, [code, id, email]);\n      if (result.affectedRows === 0) {\n        res.json({\n          message: \"Error sending verification code\",\n          failed: true\n        });\n        return;\n      }\n      req.body.mail_message = `The verification code for your Cosmo account is: <b>${code}</b>`;\n      req.body.response_msg = \"A verification code has been sent to your email\";\n      next();\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error sending verification code\",\n        failed: true\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/security/send_verification_code.js?\n}");

/***/ }

};
;