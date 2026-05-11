"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_profile_get_user_account_data_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_profile_get_user_account_data_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/profile/get_user_account_data.js"
/*!*********************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/profile/get_user_account_data.js ***!
  \*********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      id\n    } = req.params;\n    let query = `select ac.id,\n                            ac.first_name,\n                            ac.last_name,\n                            ac.gender,\n                            ac.marital_status,\n                            ac.date_of_birth,\n                            ac.email,\n                            ac.privacy,\n                            ac.mood_today,\n                            ac.last_mood_updated,\n                            ac.personal_traits,\n                            pl.link as profile_picture_link,\n                            pl.id as profile_picture_id,\n\n                            json_array()  as User_Hobbies,\n                            json_array()  as User_Locations,\n                            json_array()  as User_Professions,\n                            json_array() as User_Schools\n\n                        from \n                            User_Accounts as ac\n\n                        left join\n                            Photo_Links as pl\n                        on\n                            pl.target_id = ac.id and is_a_cover = true and pl.target_type = 'profile'\n\n                        where \n                            ac.id = ?\n                    `;\n    try {\n      let [result] = await this.sql.query(query, [id]);\n      if (result.length === 0) {\n        res.json({\n          message: \"Account not found!\",\n          result: null\n        });\n      } else {\n        res.json({\n          message: \"Account found!\",\n          result: result[0]\n        });\n      }\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error looking up account\",\n        result: null\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/profile/get_user_account_data.js?\n}");

/***/ }

};
;