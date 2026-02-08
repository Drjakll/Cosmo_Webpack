"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_get_single_album_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_get_single_album_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/get_single_album.js":
/*!***********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/get_single_album.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      album_id\n    } = req.body;\n    let requirements = [album_id];\n    let query = `select \n                        pa.*,\n                        pl.link as album_cover_link\n                    from \n                        Photo_Albums as pa \n\n                    left join\n                        Photo_Links as pl\n                    on\n                        pl.target_id = pa.id and target_type = 'album' and is_a_cover = true\n                \n                    where \n                        pa.id = ?`;\n    try {\n      let [result] = await this.sql.query(query, requirements);\n      if (result.length === 0) {\n        res.json({\n          message: \"No such album exists\",\n          photos: [],\n          album_info: {}\n        });\n        return;\n      }\n      req.body.album_info = result[0];\n\n      //Next should be get_photo_links.js\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        results: null,\n        message: \"Error retrieving albums\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/get_single_album.js?\n}");

/***/ })

};
;