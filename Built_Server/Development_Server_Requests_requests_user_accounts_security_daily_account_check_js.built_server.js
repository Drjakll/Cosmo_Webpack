"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_security_daily_account_check_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_security_daily_account_check_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/security/daily_account_check.js"
/*!********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/security/daily_account_check.js ***!
  \********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//This object is to check whether there are any unverified accounts\n//If any unverified accounts older than X days, it will get deleted from the database and their photos will be deleted from S3\nfunction request(sql, s3, PutObjectCommand, DeleteObjectsCommand) {\n  this.req_path = '/daily_account_check';\n  this.req_type = 'post';\n  this.callbacks = ['daily_account_check'];\n  this.req = async (req, res) => {\n    res.send(\"This request does nothing\");\n  };\n  let get_accounts = async x_days => {\n    let query = `\n            select \n                * \n            from \n                User_Accounts \n            where \n                created_on <= (unix_timestamp(now() - interval ${x_days} day) * 1000)\n            and\n                email_verified = 0\n            ;\n        `;\n    try {\n      let [results] = await sql.query(query);\n      return results;\n    } catch (err) {\n      console.log(err);\n      return [];\n    }\n  };\n  let get_photo_links = async user_ids => {\n    let query = `\n            select \n                * \n            from \n                Photo_Links \n            where \n                user_id in (?)\n            ;\n        `;\n    try {\n      let [results] = await sql.query(query, [user_ids]);\n      return results;\n    } catch (err) {\n      console.log(err);\n      return [];\n    }\n  };\n  let erase_photo_files = async photo_data => {\n    const max_size = 1000; // Maximum number of objects to delete in a single request\n\n    for (let i = 0; i < photo_data.length; i += max_size) {\n      const chunk = photo_data.slice(i, i + max_size);\n      const deleteParams = {\n        Bucket: process.env.BUCKET_NAME,\n        Delete: {\n          Objects: chunk.map(photo => ({\n            Key: photo.link\n          })),\n          Quiet: false\n        }\n      };\n      try {\n        await s3.send(new DeleteObjectsCommand(deleteParams));\n      } catch (err) {\n        console.log(\"Error deleting photo files from S3:\", err);\n      }\n    }\n  };\n  let erase_accounts = async accs => {\n    let user_ids = accs.map(acc => acc.id);\n    let query = `\n            delete from \n                User_Accounts \n            where \n                id in (?)\n            ;\n        `;\n    try {\n      await sql.query(query, [user_ids]);\n    } catch (err) {\n      console.log(err);\n    }\n  };\n\n  //Main function to erase unverified accounts that are older than X days\n  this.erase_unverified_accounts = async x_days => {\n    let results = await get_accounts(x_days);\n    if (results.length === 0) {\n      console.log(\"No unverified accounts to erase\");\n      return results;\n    }\n    let user_ids = results.map(acc => acc.id);\n    let photo_data = await get_photo_links(user_ids);\n\n    //Erase the photo files from S3\n    await erase_photo_files(photo_data);\n\n    //Erase the accounts from the database\n    await erase_accounts(results);\n    return results;\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/security/daily_account_check.js?\n}");

/***/ }

};
;