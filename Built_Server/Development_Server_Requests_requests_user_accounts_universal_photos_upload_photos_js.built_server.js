"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_universal_photos_upload_photos_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_universal_photos_upload_photos_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/universal/photos/upload_photos.js"
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/universal/photos/upload_photos.js ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _aws_sdk_lib_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-sdk/lib-storage */ \"./node_modules/@aws-sdk/lib-storage/dist-es/index.js\");\n\n\nlet request = function (sql, s3, PutObjectCommand) {\n  this.req_path = \"/upload_photos\";\n  this.req_type = \"post\";\n  this.callbacks = [\"uploads\", \"upload_photos\", \"add_photo_links\", \"add_album_update_log\", \"add_to_feeds\"];\n  var upload_file = async (path_name, file, bucket_name) => {\n    let input = {\n      \"Body\": file.buffer,\n      \"Bucket\": bucket_name,\n      \"Key\": path_name\n    };\n    return new _aws_sdk_lib_storage__WEBPACK_IMPORTED_MODULE_1__.Upload({\n      client: s3,\n      params: {\n        Bucket: bucket_name,\n        Key: path_name,\n        Body: file.buffer,\n        ContentType: file.mimetype\n      }\n    });\n\n    //return this.s3.upload(input)\n  };\n  let target_id_options = ['album_id', 'post_id', 'profile_id'];\n  this.req = async (req, res, next) => {\n    const uploadedFiles = req.files;\n    const {\n      user_id,\n      target_id_type,\n      target_id,\n      album_name\n    } = JSON.parse(req.body.metadata);\n    if (!uploadedFiles || uploadedFiles.length === 0 || !target_id_type || !target_id || isNaN(parseInt(user_id)) || !target_id_options.includes(target_id_type)) {\n      return res.status(400).json({\n        message: 'No files uploaded.'\n      });\n    }\n    let photo_urls = [];\n    let complete_upload = 0;\n\n    //Go through each file\n    await uploadedFiles.forEach(async file => {\n      const s3_bucket_path = `users/${user_id}/${target_id_type}/${album_name}/${file.originalname}`;\n      let upload = await upload_file(s3_bucket_path, file, process.env.BUCKET_NAME);\n\n      //Check the progress of the upload\n      upload.on(\"httpUploadProgress\", progress => {\n        const percentage = Math.floor(progress.loaded / progress.total * 100);\n        console.log(`${percentage}%`);\n      });\n      try {\n        await upload.done();\n        photo_urls.push(s3_bucket_path);\n      } catch (err) {\n        console.error('Upload failed:', err);\n      }\n      complete_upload++;\n      if (complete_upload === uploadedFiles.length) {\n        req.body.links = photo_urls;\n        req.body.target_id = parseInt(target_id);\n        req.body.target_id_type = target_id_type;\n        req.body.user_id = parseInt(user_id);\n\n        //Move onto adding filepaths to the database (add_photo_links.js)\n        next();\n      }\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/universal/photos/upload_photos.js?\n}");

/***/ }

};
;