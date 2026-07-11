"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "Development_Server_Requests_requests_user_accounts_universal_photos_get_photo_links_js";
exports.ids = ["Development_Server_Requests_requests_user_accounts_universal_photos_get_photo_links_js"];
exports.modules = {

/***/ "./Development/Server/Requests/requests/user_accounts/universal/photos/get_photo_links.js"
/*!************************************************************************************************!*\
  !*** ./Development/Server/Requests/requests/user_accounts/universal/photos/get_photo_links.js ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet request = function ({\n  sql\n}) {\n  this.req_path = \"/get_photo_links\";\n  this.req_type = \"post\";\n  this.callbacks = [\"get_photo_links\", \"get_reactions\"];\n  this.req = async (req, res, next) => {\n    let {\n      target_id,\n      target_id_type,\n      id,\n      time_uploaded\n    } = req.body;\n\n    //If id exists, we just wanted to search one photo link, else search for a list of photo links based on target_id and target_type\n    let requirements = id ? [id] : [target_id];\n\n    //If time_uploaded exists, then we probably want photos for updates in a timeline\n    requirements = time_uploaded ? [target_id, time_uploaded] : requirements;\n\n    /*----*/\n\n    //part of the query for the requirements. If only search for a single id or search within the group of target_id\n    let where_query = id ? \"pl.id = ?\" : `pl.${target_id_type} = ?`;\n    where_query = time_uploaded ? `pl.${target_id_type} = ? and time_uploaded = ?` : where_query;\n    let query = `select \n                        pl.*,\n                        (select count(*) from Comments where photo_id = pl.id) as comments_count\n                    from \n                        Photo_Links as pl\n\n                    where \n                        ${where_query}\n                    group by \n                        pl.id`;\n    try {\n      let [results] = await sql.query(query, requirements);\n      if (time_uploaded) {\n        //If time_uploaded exists, it means it's searching for a time line in a single album, which means it's coming from\n        //get_single_album.js, so album_info should exist as well.\n        //This block is made mainly for the purpose of getting feed updates\n        let {\n          album_info\n        } = req.body;\n        return results.length !== 0 ? res.json({\n          message: `Successfully retrieved ${results.length} photo links`,\n          photos: results,\n          album_info\n        }) :\n        //If all photos on the feed update is erased, then go to delete_album_update_log.js\n        next();\n        // removed by dead control flow\n\n      }\n      req.body.targets = results;\n      req.body.target_id_type = \"photo_id\";\n      req.body.photos = results; //In case delete_photo_links is the next middleware\n\n      //Either go to delete_photo_links or get_reactions\n      next();\n    } catch (err) {\n      console.log(query, err);\n      res.json({\n        result: [],\n        message: \"Error retrieving photo links\"\n      });\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://cosmo_webpack/./Development/Server/Requests/requests/user_accounts/universal/photos/get_photo_links.js?\n}");

/***/ }

};
;