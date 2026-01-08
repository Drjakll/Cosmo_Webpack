"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_get_photo_links_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_get_photo_links_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/get_photo_links.js":
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/get_photo_links.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      target_id,\n      target_type\n    } = req.body;\n    let requirements = [target_id, target_type];\n    let query = `select \n                        pl.*,\n                        coalesce(c.cc, 0) as comments_count,\n                        coalesce(gr.reactions, json_array()) as reactions\n                    from \n                        Photo_Links as pl\n                    left join\n                        (select \n                            target_id,\n                            count(*) as cc\n                        from \n                            Comments\n                        where \n                            target_type = 'photo'\n                        group by\n                            target_id\n                        ) as c\n                    on\n                        c.target_id = pl.id\n                    left join\n                        (select\n                            target_id,\n                            json_arrayagg(\n                                json_object(\n                                    'id', id,\n                                    'user_id', user_id,\n                                    'target_id', target_id,\n                                    'target_type', target_type,\n                                    'emojis', emojis,\n                                    'reaction', reaction\n                                )\n                            ) as reactions\n                        from\n                            General_Reactions\n                        where\n                            target_type = 'photo'\n                        group by\n                            target_id\n                        ) as gr\n                    on\n                        gr.target_id = pl.id\n                    where \n                        pl.target_id = ? and pl.target_type = ?`;\n    try {\n      let [results] = await this.sql.query(query, requirements);\n      req.body.results = results;\n      req.body.message = \"Successfully retrieved photo links\";\n      req.body.photos = results; //In case delete_photo_links is the next middleware\n\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        result: [],\n        message: \"Error retrieving photo links\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/get_photo_links.js?\n}");

/***/ })

};
;