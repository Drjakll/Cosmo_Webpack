"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_comments_get_comments_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_comments_get_comments_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/comments/get_comments.js":
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/comments/get_comments.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      target_id,\n      target_type,\n      offset_timestamp,\n      limit,\n      greater_or_less,\n      asc_desc,\n      reply_to_ids,\n      emojis,\n      comments\n    } = req.body;\n    let data = [target_id, target_type, offset_timestamp];\n    if (reply_to_ids) {\n      console.log(reply_to_ids);\n      reply_to_ids = reply_to_ids.split(\",\");\n      data.push(reply_to_ids);\n    }\n    let query = `select \n                        c.*,\n                        pl.link as profile_picture_link,\n                        ua.first_name as first_name,\n                        ua.last_name as last_name\n                    from \n                        Comments as c\n\n                    join\n                        User_Accounts as ua\n                    on\n                        c.user_id = ua.id\n\n                    left join\n                        Photo_Links as pl\n                    on\n                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1\n\n                    where \n                        c.target_id = ? and\n                        c.target_type = ? and\n                        c.time_stamp ${greater_or_less} ?\n                        ${reply_to_ids ? \"and c.reply_to_id  in (?)\" : \"and c.reply_to_id is null\"}\n                    order by time_stamp ${asc_desc}\n                    limit ${limit ?? 25}\n                    `;\n    try {\n      let [results] = await this.sql.query(query, data);\n\n      //If these 3 items exists, that means this function was previously called and now it comes back with retrieving only the replies. Now we can return all the items\n      if (reply_to_ids && emojis && comments) {\n        let all_results = {\n          comments,\n          emojis,\n          replies: results\n        };\n        return res.json({\n          message: \"Successfully retrieved comments\",\n          results: all_results\n        });\n      }\n      req.body.comments = results;\n\n      //Otherwise next move onto getting the reactions for each comment.\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: `Error retrieving comments`,\n        results: []\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/comments/get_comments.js?\n}");

/***/ })

};
;