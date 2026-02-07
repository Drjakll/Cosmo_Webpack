"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_delete_photo_files_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_delete_photo_files_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/delete_photo_files.js":
/*!*************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/delete_photo_files.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  var delete_files = async (path_name, bucket_name) => {\n    let input = {\n      \"Bucket\": bucket_name,\n      \"Key\": path_name\n    };\n    await this.s3.deleteObject(input).promise();\n  };\n  this.req = async (req, res, next) => {\n    let {\n      photos\n    } = req.body;\n    if (Object.keys(photos || {}).length === 0) {\n      res.json({\n        message: \"No files deleted\"\n      });\n      return;\n    }\n    let target_type = \"\";\n    let album_id = \"\";\n    let {\n      BucketName\n    } = this.global_data;\n    for (let i in photos) {\n      target_type = photos[i].target_type;\n      album_id = photos[i].target_id;\n      await delete_files(photos[i].link, BucketName);\n    }\n    res.json({\n      message: `Successfully deleted ${Object.keys(photos).length} files`\n    });\n    res.end();\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/delete_photo_files.js?\n}");

/***/ })

};
;