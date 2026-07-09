"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_security_send_email_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_security_send_email_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/security/send_email.js"
/*!***********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/security/send_email.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"./node_modules/nodemailer/lib/nodemailer.js\");\n\nfunction request(sql, s3, PutObjectCommand) {\n  this.req_path = '/send_email';\n  this.req_type = 'post';\n  this.callbacks = ['send_email'];\n  this.req = (req, res) => {\n    let {\n      email,\n      mail_message,\n      response_msg\n    } = req.body;\n    let transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({\n      service: process.env.MAIL_HOST,\n      auth: {\n        user: process.env.GOOGLE_EMAIL,\n        pass: process.env.GOOGLE_EMAIL_PASSWORD\n      }\n    });\n    let mailOptions = {\n      from: process.env.GOOGLE_EMAIL,\n      to: email,\n      subject: 'Cosmo Verification Code',\n      text: mail_message,\n      html: `<pre>${mail_message}</pre>`\n    };\n    transporter.sendMail(mailOptions, (error, info) => {\n      if (error) {\n        console.log(error);\n        res.json({\n          message: \"Error sending email\",\n          failed: true\n        });\n      } else {\n        console.log('Email sent: ' + info.response, response_msg);\n        res.json({\n          message: response_msg,\n          failed: false\n        });\n      }\n    });\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/security/send_email.js?\n}");

/***/ }

};
;