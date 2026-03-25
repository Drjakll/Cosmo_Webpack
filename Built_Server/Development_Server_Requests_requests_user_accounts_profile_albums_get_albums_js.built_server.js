"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_get_albums_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_get_albums_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/get_albums.js"
/*!*****************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/get_albums.js ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      id: user_id\n    } = req.params;\n    let requirements = [user_id];\n    let query = `select \n                        pa.*,\n                        coalesce(pl.link, '') as album_cover_link,\n                        coalesce(pl.id, '') as album_cover_id,\n                        coalesce(pc.photo_count, 0) as photo_count\n                    from \n                        Photo_Albums as pa \n\n                    left join\n                        Photo_Links as pl\n                    on\n                        pl.target_id = pa.id and target_type = 'album' and is_a_cover = true\n                    \n                    left join\n                        (select \n                            target_id,\n                            count(target_id) as photo_count\n                        from\n                            Photo_Links\n                        where \n                            target_type = 'album'\n                        group by\n                            target_id\n                        ) as pc\n                    on\n                        pc.target_id = pa.id\n                    \n                    where \n                        pa.user_id = ? order by created_on desc`;\n    try {\n      let [results] = await this.sql.query(query, requirements);\n      res.json({\n        results,\n        message: `Successfully retrieved ${results.length} albums`\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        results: null,\n        message: \"Error retrieving albums\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/get_albums.js?\n}");

/***/ }

};
;