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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formidable */ \"./node_modules/formidable/src/index.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nlet request = function () {\n  var upload_file = async (path_name, data, bucket_name) => {\n    let input = {\n      \"Body\": data,\n      \"Bucket\": bucket_name,\n      \"Key\": path_name\n    };\n    return this.s3.upload(input);\n  };\n  this.req = async (req, res, next) => {\n    const uploadedFiles = req.files;\n    const {\n      user_id,\n      target_type,\n      target_id,\n      album_name\n    } = JSON.parse(req.body.metadata);\n    if (!uploadedFiles || uploadedFiles.length === 0) {\n      return res.status(400).json({\n        message: 'No files uploaded.'\n      });\n    }\n    let photo_urls = [];\n    let complete_upload = 0;\n\n    //Go through each file\n    await uploadedFiles.forEach(async file => {\n      const tempPath = file.path;\n      var file_data = fs__WEBPACK_IMPORTED_MODULE_1___default().createReadStream(tempPath);\n      const s3_bucket_path = `users/${user_id}/${target_type}/${album_name}/${file.originalname}`;\n      const {\n        BucketName\n      } = this.global_data;\n      let upload = await upload_file(s3_bucket_path, file_data, BucketName);\n\n      //Check the progress of the upload\n      upload.on(\"httpUploadProgress\", progress => {\n        const percentage = Math.floor(progress.loaded / progress.total * 100);\n        console.log(`${percentage}%`);\n      });\n\n      //Check for completion or error\n      upload.send((err, data) => {\n        complete_upload++;\n        if (err) {\n          console.log(err);\n        } else {\n          //If no error, push the path to the photo_urls array\n          photo_urls.push(s3_bucket_path);\n          console.log(`Successfully uploaded to location: ${data.Location}`);\n        }\n\n        //If every file has completed/failed upload, then procceed\n        if (complete_upload === uploadedFiles.length) {\n          req.body.links = photo_urls;\n          req.body.target_id = parseInt(target_id);\n          req.body.target_type = target_type;\n\n          //Move onto adding filepaths to the database\n          next();\n        }\n      });\n      fs__WEBPACK_IMPORTED_MODULE_1___default().unlink(tempPath, err => {\n        if (err) {\n          console.error('Error removing file:', err);\n        }\n      });\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/photos/upload_photos.js?\n}");

/***/ })

};
;