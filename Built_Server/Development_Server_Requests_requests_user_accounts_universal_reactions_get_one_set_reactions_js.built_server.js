"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_universal_reactions_get_one_set_reactions_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_universal_reactions_get_one_set_reactions_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/universal/reactions/get_one_set_reactions.js"
/*!*********************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/universal/reactions/get_one_set_reactions.js ***!
  \*********************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/get_one_set_reactions/:target_id/:target_id_type\";\n  this.req_type = \"get\";\n  this.callbacks = [\"get_one_set_reactions\"];\n  this.req = async (req, res) => {\n    let {\n      target_id,\n      target_id_type\n    } = req.params;\n    let query = `select \n                        r.*,\n                        ua.first_name as first_name,\n                        ua.last_name as last_name,\n                        pl.link as profile_picture_link\n                    from \n                        Reactions as r\n\n                    join\n                        User_Accounts as ua\n                    on\n                        r.user_id = ua.id\n\n                    left join\n                        Photo_Links as pl\n                    on\n                        pl.profile_id = ua.id and pl.is_a_cover = 1\n\n                    where \n                        r.${target_id_type} = ?\n                    `;\n    try {\n      let [results] = await sql.query(query, [target_id]);\n      res.json({\n        message: \"Successfully rertrieved some reactions\",\n        results,\n        failed: false\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: `Error retrieving reactions`,\n        results: [],\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/universal/reactions/get_one_set_reactions.js?\n}");

/***/ }

};
;