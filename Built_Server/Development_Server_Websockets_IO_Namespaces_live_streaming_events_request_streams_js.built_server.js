"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Websockets_IO_Namespaces_live_streaming_events_request_streams_js";
exports.ids = ["Development_Server_Websockets_IO_Namespaces_live_streaming_events_request_streams_js"];
exports.modules = {

/***/ "./Development/Server/Websockets/IO_Namespaces/live_streaming/events/request_streams.js":
/*!**********************************************************************************************!*\
  !*** ./Development/Server/Websockets/IO_Namespaces/live_streaming/events/request_streams.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Wrapper = function () {\n  let Search_Stream = async requirements => {\n    let result = {};\n    let Search_Entry = async (value, i_ptr) => {\n      let vSplit = value.toLowerCase().split(\"\");\n      let recursion = async (i, ptr) => {\n        if (i >= vSplit.length) {\n          return true;\n        }\n        if (!ptr) {\n          return false;\n        }\n        let c = vSplit[i];\n        if (!(await recursion(i + 1, ptr[c]))) {\n          return false;\n        }\n        for (let j in ptr) {\n          if (j === \"tags\") {\n            let tag = ptr[j];\n            for (let k in tag) {\n              result[k] = tag[k];\n            }\n            continue;\n          }\n          await recursion(i + 1, ptr[j]);\n        }\n        return false;\n      };\n      let c = vSplit[0];\n      if (!c) {\n        return;\n      }\n      if (await recursion(1, i_ptr[c])) {\n        let tags = i_ptr[c].tags;\n        for (let i in tags) {\n          result[i] = tags[i];\n        }\n      }\n    };\n    let Json_Search = async (obj, key) => {\n      for (let i in obj) {\n        let ptr = this.active_streams[key][i];\n        let value = obj[i];\n        await Search_Entry(value, ptr);\n      }\n    };\n    for (let i in requirements) {\n      let req = requirements[i];\n      switch (typeof req) {\n        case \"object\":\n          await Json_Search(req, i);\n          break;\n        case \"string\":\n          await Search_Entry(req, this.active_streams[i]);\n          break;\n      }\n    }\n    return result;\n  };\n  this.event = async search => {\n    let result = await Search_Stream(search);\n    this.my_socket.emit('catch_streams', {\n      streams: result\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wrapper);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Websockets/IO_Namespaces/live_streaming/events/request_streams.js?");

/***/ })

};
;