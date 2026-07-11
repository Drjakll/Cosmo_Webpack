"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_albums_update_album_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_albums_update_album_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/albums/update_album.js"
/*!*******************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/albums/update_album.js ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/update_album\";\n  this.req_type = \"patch\";\n  this.callbacks = [\"update_album\"];\n  this.req = async (req, res) => {\n    let {\n      id,\n      album_info\n    } = req.body;\n    if (!id) {\n      res.json({\n        message: \"Invalid id or user id\",\n        failed: true\n      });\n      return;\n    }\n    let query = `update Photo_Albums set ? where id = ?`;\n    try {\n      await sql.query(query, [album_info, id]);\n      res.json({\n        message: \"Successfully updated Photo Album\",\n        failed: false\n      });\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error updating Photo Album\",\n        failed: true\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/albums/update_album.js?\n}");

/***/ }

};
;