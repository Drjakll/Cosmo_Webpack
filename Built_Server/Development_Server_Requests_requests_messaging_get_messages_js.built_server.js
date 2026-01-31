"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_get_messages_js";
exports.ids = ["Development_Server_Requests_requests_messaging_get_messages_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/get_messages.js":
/*!************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/get_messages.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res) => {\n    let {\n      conversation_id,\n      off_time_set,\n      user_time_joined\n    } = req.body;\n    let query = `\n            select\n                pm.*,\n                ua.first_name as first_name,\n                ua.last_name as last_name,\n                pl.link as profile_picture_link\n            from\n                Private_Messages as pm\n\n            left join\n                User_Accounts as ua\n            on\n                ua.id = pm.sender_id\n            \n            left join\n                Photo_Links as pl\n            on\n                pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1\n            \n            where\n                pm.conversation_id = ? and\n                pm.created_on < ? and\n                pm.created_on >= ? \n                order by pm.created_on \n                asc\n                limit 25\n            `;\n    try {\n      let [results] = await this.sql.query(query, [conversation_id, off_time_set, user_time_joined]);\n      res.json({\n        message: `Successfully retrieved ${results.length} messages`,\n        results\n      });\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error getting messages\",\n        results: []\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/get_messages.js?\n}");

/***/ })

};
;