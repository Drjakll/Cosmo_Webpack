"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_get_conversations_js";
exports.ids = ["Development_Server_Requests_requests_messaging_get_conversations_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/get_conversations.js":
/*!*****************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/get_conversations.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = (req, res) => {\n    let {\n      user\n    } = req.body;\n    let query = `\n                    select\n                        ua.first_name,\n                        ua.last_name,\n                        ua.profile_picture_link,\n                        ua.email,\n                        s.*\n                    from\n                        User_Accounts as ua\n                    join\n                        (select\n                            r.*\n                        from \n                            Conversation_Participants as r\n                        join\n                            (select \n                                cp.conversation_id\n                            from \n                                Conversation_Participants as cp\n                            where\n                                cp.user_email = '${user.email}') as t\n                        where\n                            t.conversation_id = r.conversation_id) as s\n                    where\n                        s.user_email = ua.email\n                    order by ua.first_name asc\n                    `;\n    this.sql.query(query, (err, data) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error fetching conversations\",\n          results: []\n        });\n      } else {\n        res.json({\n          message: `Successfully found ${data.length} results`,\n          results: data\n        });\n      }\n      res.end();\n    });\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/get_conversations.js?\n}");

/***/ })

};
;