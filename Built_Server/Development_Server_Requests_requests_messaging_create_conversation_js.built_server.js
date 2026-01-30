"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_messaging_create_conversation_js";
exports.ids = ["Development_Server_Requests_requests_messaging_create_conversation_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/messaging/create_conversation.js":
/*!*******************************************************************************!*\
  !*** ./Development/Server/Requests/requests/messaging/create_conversation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction request() {\n  this.req = async (req, res, next) => {\n    let {\n      from_id,\n      oppose_id\n    } = req.body;\n    let now = Date.now();\n    let query = `insert into Private_Conversations(chat_type, created_on) values(?,?)`;\n    try {\n      let [result] = await this.sql.query(query, ['group', now]);\n      let {\n        insertId\n      } = result;\n      req.body.conversation_id = insertId;\n      req.body.new_users = [from_id, oppose_id];\n\n      //Should call add_conversation_participants.js\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        message: \"Error creating the conversation\",\n        success: false\n      });\n    }\n  };\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/messaging/create_conversation.js?\n}");

/***/ })

};
;