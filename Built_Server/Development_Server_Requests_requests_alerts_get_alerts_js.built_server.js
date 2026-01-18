"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_alerts_get_alerts_js";
exports.ids = ["Development_Server_Requests_requests_alerts_get_alerts_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/alerts/get_alerts.js":
/*!*******************************************************************!*\
  !*** ./Development/Server/Requests/requests/alerts/get_alerts.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  this.req = async (req, res) => {\n    let {\n      user_account\n    } = req.body;\n    let {\n      id\n    } = user_account;\n    let data = [id];\n    query = `select\n                      coalesce(follower_accounts.info_array, json_array()) as followers_pending\n                        \n                from Connections as c\n\n                left join Connections as c2\n                on\n                    c2.status = 'pending' and c2.followed_id = c.followed_id\n\n                left join \n                    (select \n                        ua.id,\n                        json_arrayagg(\n                            json_object(\n                                'id', ua.id,\n                                'first_name', ua.first_name,\n                                'last_name', ua.last_name,\n                                'profile_picture_link', pl.link\n                            )\n                        ) as info_array\n                    from User_Accounts as ua\n                    left join Photo_Links as pl\n                    on\n                        ua.id = pl.target_id and pl.is_a_cover = 1 and pl.target_type = 'profile'\n                    group by\n                        ua.id\n                    ) as follower_accounts\n                on\n                    follower_accounts.id = c2.follower_id\n                \n                where \n                    c.followed_id = ?\n            `;\n    try {\n      await this.sql.query(query, data);\n    } catch (err) {\n      console.log(err);\n      res.json({\n        message: \"Error retrieving alerts\",\n        results: []\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/alerts/get_alerts.js?\n}");

/***/ })

};
;