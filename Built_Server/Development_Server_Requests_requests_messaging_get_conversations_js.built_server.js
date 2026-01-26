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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res) => {\n    let {\n      user\n    } = req.body;\n    let {\n      id\n    } = user;\n    let data = [id];\n    let query = `\n                    select \n                        all_users.*,\n                        ua.first_name as first_name,\n                        ua.last_name as last_name,\n                        pl.link as profile_picture_link\n                    from\n                        Users_In_Private_Conversations as all_users\n\n                    join \n                        (select \n                            u.*\n                        from\n                            Users_In_Private_Conversations as u\n                        where \n                            user_id = ?\n                        ) as target_user\n\n                    join\n                        User_Accounts as ua\n                    on\n                        ua.id = all_users.user_id\n                    left join\n                        Photo_Links as pl\n                    on\n                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1\n\n                    where\n                        target_user.conversation_id = all_users.conversation_id\n                    `;\n    try {\n      let [results] = await this.sql.query(query, data);\n      res.json({\n        message: `Successfully found ${results.length} results`,\n        results\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error fetching conversations\",\n        results: []\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/get_conversations.js?\n}");

/***/ })

};
;