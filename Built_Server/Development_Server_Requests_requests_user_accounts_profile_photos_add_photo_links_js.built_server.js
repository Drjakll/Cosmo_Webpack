"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_add_photo_links_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_add_photo_links_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_links.js"
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_links.js ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/add_photo_links\";\n  this.req_type = \"post\";\n  this.callbacks = [\"add_photo_links\"];\n  this.req = async (req, res, next) => {\n    let {\n      links,\n      target_type,\n      target_id\n    } = req.body;\n    let time_uploaded = Date.now();\n    let to_be_inserted = [];\n    for (let link of links) {\n      to_be_inserted.push([link, target_type, target_id, time_uploaded]);\n    }\n    let query = `insert into Photo_Links(link, target_type, target_id, time_uploaded) values ?`;\n    try {\n      await this.sql.query(query, [to_be_inserted]);\n\n      //If adding it to the album, then log the change\n      if (target_type === \"album\") {\n        req.body.album_id = target_id;\n        req.body.time_occurred = time_uploaded;\n\n        //This should call add_album_update_log.js\n        next();\n        return;\n      }\n      res.json({\n        message: \"Successfully added photo links!\"\n      });\n    } catch (err) {\n      console.log(err, query);\n      res.json({\n        message: \"Error adding photo links\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/add_photo_links.js?\n}");

/***/ }

};
;