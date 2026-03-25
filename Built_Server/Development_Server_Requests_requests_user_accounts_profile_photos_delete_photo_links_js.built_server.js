"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_delete_photo_links_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_delete_photo_links_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/delete_photo_links.js"
/*!*************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/delete_photo_links.js ***!
  \*************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res, next) => {\n    let {\n      photos\n    } = req.body;\n    if (Object.keys(photos || {}).length === 0) {\n      res.json({\n        message: \"No photos to delete\"\n      });\n      return;\n    }\n    let ids = [],\n      target_ids = [],\n      target_types = [];\n    for (let i in photos) {\n      let {\n        id,\n        target_id,\n        target_type\n      } = photos[i];\n      ids.push(id);\n      target_ids.push(target_id);\n      target_types.push(target_type);\n    }\n    if (photos.length === 0) {\n      res.json({\n        message: \"No photo data has been deleted\"\n      });\n      return;\n    }\n    let query = `delete from Photo_Links where id in (?) and target_id in (?) and target_type in (?)`;\n    try {\n      await this.sql.query(query, [ids, target_ids, target_types]);\n\n      //Setup for deleting comments next\n\n      let comment_target_ids = [];\n      let comment_target_types = [];\n      for (let id of ids) {\n        comment_target_ids.push(id);\n        comment_target_types.push(\"photo\");\n      }\n      req.body.requirements = [comment_target_ids, comment_target_types];\n\n      //Should call delete_comments_from_target\n      next();\n    } catch (err) {\n      console.log(query, err);\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/delete_photo_links.js?\n}");

/***/ }

};
;