"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_universal_reactions_submit_reaction_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_universal_reactions_submit_reaction_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/universal/reactions/submit_reaction.js"
/*!***************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/universal/reactions/submit_reaction.js ***!
  \***************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/submit_reaction\";\n  this.req_type = \"post\";\n  this.callbacks = [\"submit_reaction\"];\n  this.req = async (req, res) => {\n    let {\n      target_id,\n      emoji,\n      reaction,\n      user_id,\n      target_id_type\n    } = req.body;\n    if (isNaN(parseInt(user_id)) || !target_id) {\n      res.json({\n        message: \"Missing required fields!\",\n        failed: true\n      });\n      return;\n    }\n\n    //Differnt number of values for data depending on whether it's a comment type or some other types. Comment type would comes target_type as null\n    let data = [target_id, user_id, emoji, reaction];\n    let query = `insert into \n                        Reactions\n                        (${target_id_type}, user_id, emojis, reaction) \n                    values\n                        (?,?,?,?)\n                    as new\n                    on duplicate key\n                    update \n                        reaction = case \n                                when\n                                    new.reaction is null\n                                    then Reactions.reaction\n                                when\n                                    Reactions.reaction = new.reaction \n                                    then null \n                                else\n                                    new.reaction\n                            end,\n                        emojis = Reactions.emojis ^ new.emojis`;\n    try {\n      await sql.query(query, data);\n      res.json({\n        message: \"Successfully submitted a reaction\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error submitting a reaction\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/universal/reactions/submit_reaction.js?\n}");

/***/ }

};
;