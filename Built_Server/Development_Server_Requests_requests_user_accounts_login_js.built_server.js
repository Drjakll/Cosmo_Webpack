"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_login_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_login_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/login.js":
/*!*********************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/login.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res) => {\n    let {\n      email,\n      password\n    } = req.body;\n    let data = [email, password];\n    let query = `select \n                        ua.id,\n                        ua.first_name,\n                        ua.last_name,\n                        ua.marital_status,\n                        ua.gender,\n                        ua.date_of_birth,\n                        ua.email,\n                        ua.created_on,\n                        ua.password,\n                        ua.privacy,\n                        pl.link as profile_picture_link,\n                        pl.id as profile_picture_id,\n\n                        coalesce(fc.following_ids, json_array()) as following_ids,\n                        coalesce(frc.follower_ids, json_array()) as follower_ids,\n\n                        json_array() as User_Hobbies,\n                        json_array() as User_Locations,\n                        json_array() as User_Schools,\n                        json_array() as User_Professions\n                    \n                    from \n                        User_Accounts as ua\n\n                    left join \n                        Photo_Links as pl\n                    on \n                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1\n\n                    left join\n                        (select\n                            follower_id,\n                            json_arrayagg(followed_id) as following_ids\n                        from\n                            Connections\n                        where\n                            status = 'accepted'\n                        group by\n                            follower_id\n                        ) as fc\n                    on\n                        fc.follower_id = ua.id\n\n                    left join\n                        (select\n                            followed_id,\n                            json_arrayagg(follower_id) as follower_ids\n                        from\n                            Connections\n                        where\n                            status = 'accepted'\n                        group by\n                            followed_id\n                        ) as frc\n                    on\n                        frc.followed_id = ua.id\n\n                    where \n                        ua.email = ? and ua.password = ?\n        `;\n    try {\n      let [result] = await this.sql.query(query, data);\n      if (!result.length) {\n        return res.json({\n          message: \"No account matches with the email and password\",\n          acc_info: null,\n          status: 0b10\n        });\n      }\n      res.json({\n        message: \"Successfully retrieved account data!\",\n        acc_info: result[0],\n        status: 0b11\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error retreiving user account\",\n        acc_info: null,\n        status: 0b01\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/login.js?\n}");

/***/ })

};
;