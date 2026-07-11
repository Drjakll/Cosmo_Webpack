"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_security_login_with_session_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_security_login_with_session_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/security/login_with_session.js"
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/security/login_with_session.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request({\n  sql\n}) {\n  //This route should not be accessible by the frontend directly\n  this.req_path = '/rfasdfavzvcsfzdvzxcvcvrfasdfwqerqwerqwerasdfcvzxcvzvzxcv123234234sdfasdf';\n  this.req_type = 'post';\n  this.callbacks = ['login_with_session'];\n  this.req = async (req, res, next) => {\n    let {\n      acc_info,\n      session_id,\n      server_password\n    } = req.body;\n\n    //The password is on the .env file\n    if (server_password !== process.env.SERVER_PASSWORD) {\n      res.end();\n      return;\n    }\n    const {\n      id: user_id\n    } = acc_info;\n    const userAgent = req.headers[\"user-agent\"];\n    let now = Date.now();\n    const ip_address = req.ip;\n    let data = [now, session_id, user_id, now, userAgent, ip_address];\n    let query = `update User_Sessions \n                        set\n                            last_seen = ?\n                        where\n                            session_id = ?\n                        and\n                            user_id = ?\n                        and\n                            expires_on > ?\n                        and\n                            user_agent = ?\n                        and\n                            ip_address = ?\n                    `;\n    try {\n      let [result] = await sql.query(query, data);\n      if (result.affectedRows === 0) {\n        return res.json({\n          message: \"Login session has expired\",\n          acc_info: null,\n          status: 0b001\n        });\n      } else {\n        acc_info.session_id = session_id;\n        return res.json({\n          message: \"Successfully logged in\",\n          acc_info,\n          status: 0b100\n        });\n      }\n    } catch (err) {\n      console.log(err);\n      return res.json({\n        message: \"Error logging in\",\n        acc_info: null,\n        status: 0b001\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/security/login_with_session.js?\n}");

/***/ }

};
;