"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_get_comment_reactions_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_get_comment_reactions_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/get_comment_reactions.js"
/*!******************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/get_comment_reactions.js ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/get_comment_reactions\";\n  this.req_type = \"post\";\n  this.callbacks = [\"get_comment_reactions\"];\n  this.req = async (req, res, next) => {\n    let {\n      comments\n    } = req.body;\n    let data = [];\n    for (let comment of comments) {\n      let {\n        id\n      } = comment;\n      data.push(id);\n    }\n    if (!data.length) {\n      req.body.emojis = [];\n      req.body.reply_to_ids = \"\";\n\n      //Will call get_comments.js\n      next();\n      return;\n    }\n    let query = `select \n                        r.*,\n                        ua.first_name as first_name,\n                        ua.last_name as last_name,\n                        coalesce(pl.link, \"\") as profile_picture_link\n                    from \n                        Reactions as r\n\n                    join\n                        User_Accounts as ua\n                    on\n                        r.user_id = ua.id\n\n                    left join\n                        Photo_Links as pl\n                    on\n                        pl.profile_id = ua.id and pl.is_a_cover = 1\n\n                    where \n                        r.comment_id in (?)\n                    `;\n    try {\n      let [results] = await sql.query(query, [data]);\n      req.body.emojis = results;\n      req.body.reply_to_ids = data;\n\n      //Next move onto getting replies, which will call get_comments.js again\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: `Error retrieving comments`,\n        results: [],\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/get_comment_reactions.js?\n}");

/***/ }

};
;