"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_photos_upload_photos_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_photos_upload_photos_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/photos/upload_photos.js":
/*!********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/photos/upload_photos.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formidable */ \"./node_modules/formidable/src/index.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nlet request = function () {\n  var upload_file = async (path_name, data, bucket_name) => {\n    let input = {\n      \"Body\": data,\n      \"Bucket\": bucket_name,\n      \"Key\": path_name\n    };\n    return this.s3.upload(input);\n  };\n  this.req = async (req, res) => {\n    const uploadedFiles = req.files;\n    const {\n      email,\n      album\n    } = JSON.parse(req.body.metadata);\n    if (!uploadedFiles || uploadedFiles.length === 0) {\n      return res.status(400).json({\n        message: 'No files uploaded.'\n      });\n    }\n    let photo_urls = [];\n    let complete_upload = 0;\n    await uploadedFiles.forEach(async file => {\n      const tempPath = file.path;\n      const s3_bucket_path = `users/${email.toLowerCase()}/${album}/${file.originalname}`;\n      photo_urls.push(s3_bucket_path);\n      var file_data = await fs__WEBPACK_IMPORTED_MODULE_1___default().createReadStream(tempPath);\n      const fileSize = fs__WEBPACK_IMPORTED_MODULE_1___default().statSync(tempPath).size;\n      const {\n        BucketName\n      } = this.global_data;\n      let upload = await upload_file(s3_bucket_path, file_data, BucketName);\n      upload.on(\"httpUploadProgress\", progress => {\n        const percentage = (progress.loaded / fileSize * 100).toFixed(2);\n        if (percentage >= 100) {\n          complete_upload++;\n          if (complete_upload === uploadedFiles.length) {\n            res.json({\n              message: 'Files uploaded successfully',\n              photo_urls: photo_urls\n            });\n            res.end();\n          }\n        }\n      });\n      await upload.promise();\n      fs__WEBPACK_IMPORTED_MODULE_1___default().unlink(tempPath, err => {\n        if (err) {\n          console.error('Error removing file:', err);\n        }\n      });\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/upload_photos.js?");

/***/ })

};
;