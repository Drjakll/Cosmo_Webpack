"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_get_replies_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_get_replies_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/get_replies.js":
/*!********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/get_replies.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      target_type,\n      target_id,\n      reply_to_id,\n      offset_timestamp\n    } = req.body;\n    let query = `select \n                        c.*,\n                        ua.first_name as first_name,\n                        ua.last_name as last_name,\n                        pl.link as profile_picture_link,\n                        coalesce(r.user_reactions, json_array()) as user_reactions\n                    from \n                        Comments as c\n\n                    join\n                        User_Accounts as ua\n                    on\n                        c.user_id = ua.id\n\n                    left join\n                        Photo_Links as pl\n                    on\n                        pl.target_type = \"profile\" and pl.target_id = ua.id and pl.is_a_cover = true\n\n                    left join \n                        (select \n                            target_id,\n                            target_type,\n                            json_arrayagg(\n                                json_obj(\n                                    'id', id,\n                                    'emojis', emojis,\n                                    'reaction', reaction\n                                )\n                            ) as user_reactions\n                        from\n                            Reactions\n                        group by \n                            target_id\n                        ) as r\n                    on\n                        r.target_id = c.id and r.target_type = \"comments\"\n\n                    where \n                        c.target_type = ? and\n                        c.target_type = ? and\n                        c.reply_to_id = ? and \n                        c.time_stamp > ?\n                    order by\n                        c.time_stamp desc\n                    limit = 10\n                    `;\n    try {\n      let [results] = await this.sql.query(query, [target_type, target_id, reply_to_id, offset_timestamp]);\n      res.json({\n        message: \"Successfully retrieved replies\",\n        results,\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error retrieving replies\",\n        results: [],\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/get_replies.js?\n}");

/***/ })

};
;