"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_delete_album_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_delete_album_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/delete_album.js"
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/delete_album.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/delete_album\";\n  this.req_type = \"post\";\n  this.callbacks = [\"delete_album\", \"delete_photo_files\"];\n  this.req = async (req, res, next) => {\n    let {\n      id\n    } = req.body;\n    if (!id) {\n      console.log(\"Album id is null or invalid\");\n      res.end();\n      return;\n    }\n    let query = `select * from Photo_Links where album_id = ?`;\n    try {\n      let [photos] = await sql.query(query, [id]);\n      query = `delete from Photo_Albums where id = ?`;\n      await this.sql.query(query, [id]);\n      req.body.photos = photos;\n\n      //delete_photo_links.js\n      next();\n    } catch (err) {\n      console.log(err, query);\n      res.json({\n        message: \"Album failed to delete!\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/delete_album.js?\n}");

/***/ }

};
;