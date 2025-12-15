"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_connections_send_follow_request_js";
exports.ids = ["Development_Server_Requests_requests_connections_send_follow_request_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/connections/send_follow_request.js":
/*!*********************************************************************************!*\
  !*** ./Development/Server/Requests/requests/connections/send_follow_request.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function () {\n  let calculate_status = async (privacy, to_id, from_id) => {\n    switch (privacy) {\n      case \"public\":\n        return \"accepted\";\n      case \"mutual_only\":\n        let mutual = await this.sql.query(`\n                    select \n                        count(*) as count \n                    from\n                        Connections as A\n                    join \n                        Connections as B\n                    on \n                        A.followed_id = B.follower_id\n                    where \n                        A.follower_id = ${from_id}\n                    and \n                        B.followed_id = ${to_id};\n                `);\n        if (mutual[0].count > 0) {\n          return \"accepted\";\n        } else {\n          return \"rejected\";\n        }\n      case \"private\":\n        return \"pending\";\n    }\n  };\n  this.req = async (req, res) => {\n    let {\n      from_id,\n      id: to_id,\n      user_account_info: to_account_info\n    } = req.body;\n    let now = Date.now();\n    let {\n      privacy\n    } = to_account_info;\n    let status = await calculate_status(privacy, to_id, from_id);\n    let query = `\n            insert into Connections (follower_id, followed_id, time_stamp, status) values(${from_id}, ${to_id}, ${now}, \"${status}\");\n        `;\n    this.sql.query(query, (err, result) => {\n      if (err) {\n        console.log(query, err.sqlMessage);\n        res.json({\n          message: \"Error sending follow request\"\n        });\n      } else {\n        res.json({\n          message: \"Successfully sent follow request!\"\n        });\n      }\n      res.end();\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/connections/send_follow_request.js?\n}");

/***/ })

};
;