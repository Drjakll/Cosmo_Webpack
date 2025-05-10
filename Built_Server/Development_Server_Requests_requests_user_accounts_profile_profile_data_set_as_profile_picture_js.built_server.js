"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_profile_data_set_as_profile_picture_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_profile_data_set_as_profile_picture_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/profile_data/set_as_profile_picture.js":
/*!***********************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/profile_data/set_as_profile_picture.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  var clone_file = async (copy_src, dest_src, bucket_name) => {\n    let input = {\n      \"Bucket\": bucket_name,\n      \"CopySource\": copy_src,\n      \"Key\": dest_src\n    };\n    await this.s3.copyObject(input).promise();\n  };\n  this.req = async (req, res) => {\n    let {\n      src_path,\n      account_details\n    } = req.body;\n    let path_parts = src_path.split('/');\n    path_parts[3] = 'main_profile_picture.jpg';\n    const {\n      BucketName\n    } = this.global_data;\n    let copy_src = `/${BucketName}/${src_path}`;\n    let dest_src = `${path_parts[0]}/${path_parts[1]}/${path_parts[2]}/${path_parts[3]}`;\n    await clone_file(copy_src, dest_src, BucketName);\n\n    //Update the sql database\n\n    account_details.profile_picture_link = dest_src;\n    let query = this.generate_update_query(\"User_Accounts\", account_details, {\n      \"email\": account_details.email\n    });\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(err.sqlMessage);\n        res.json({\n          message: \"Error updating profile picture!\",\n          acc_info: account_details,\n          status: 0\n        });\n      } else {\n        res.json({\n          message: \"Profile picture updated!\",\n          acc_info: account_details,\n          status: 0\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/profile_data/set_as_profile_picture.js?");

/***/ })

};
;