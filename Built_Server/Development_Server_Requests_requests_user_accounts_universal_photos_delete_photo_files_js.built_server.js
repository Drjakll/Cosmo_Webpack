"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_universal_photos_delete_photo_files_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_universal_photos_delete_photo_files_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/universal/photos/delete_photo_files.js"
/*!***************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/universal/photos/delete_photo_files.js ***!
  \***************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  s3,\n  DeleteObjectsCommand\n}) {\n  this.req_path = \"/delete_photo_files\";\n  this.req_type = \"post\";\n  this.callbacks = [\"delete_photo_files\"];\n  var delete_files = async (photos, bucket_name) => {\n    let input = {\n      \"Bucket\": bucket_name,\n      \"Delete\": {\n        \"Objects\": Object.keys(photos).map(i => ({\n          \"Key\": photos[i].link\n        })),\n        \"Quiet\": false\n      }\n    };\n    await s3.send(new DeleteObjectsCommand(input));\n  };\n  this.req = async (req, res, next) => {\n    let {\n      photos\n    } = req.body;\n    if (Object.keys(photos || {}).length === 0) {\n      res.json({\n        message: \"No files deleted\"\n      });\n      return;\n    }\n    let BucketName = process.env.BUCKET_NAME;\n    await delete_files(photos, BucketName);\n    res.json({\n      message: `Successfully deleted ${Object.keys(photos).length} files`\n    });\n    res.end();\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/universal/photos/delete_photo_files.js?\n}");

/***/ }

};
;