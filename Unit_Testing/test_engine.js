import fs from "fs/promises";
import 'dotenv/config';

const domain = 'http://localhost:8080';
let cookie = {};
let cookie_str = "";
let attentions = [];
let test_index = 1;
let total_time = 0;

async function Traversal(rootPath, test_unit_options){
    
    const entries = await fs.readdir(rootPath);

    for(let entry of entries){

        let subPath = `${rootPath}/${entry}`;

        const isDir = (await fs.lstat(subPath)).isDirectory();

        if (isDir) {

            await Traversal(subPath, test_unit_options);

        } else {
            
            let file_name_parts = entry.split('.');

            if(file_name_parts[1] !== "js"){
                continue;
            }

            try {

                let option = await import(subPath);

                test_unit_options.push(option);

            }catch(e){

                console.log(e);

            }

        }
    }
}

async function Store_Cookie(result_cookies){

    if(result_cookies && result_cookies.length > 0){

        let cookie_str = result_cookies.map(cookie => cookie.split(';')[0]);

        for(let cookie_pair of cookie_str){
            
            let [key, value] = cookie_pair.split('=');

            cookie[key] = value;
        }

    }
}

async function Convert_Cookie_To_String(){

    let cookie_str = Object.entries(cookie).map(([key, value]) => `${key}=${value}`).join('; ');

    return cookie_str;
}

async function Test_Update_Get_Engine(root) {

    let test_unit_options = [];

    await Traversal(root, test_unit_options);

    console.log("\n"); 
    
    for(let option of test_unit_options){

        let {end_point, test_cases, req_type} = option.default;

        let failed_cases = 0;

        let start_time = Date.now();

        console.log("Test Index: ", test_index);

        for(let test_case of test_cases){
            
            let {description, data, show_result} = test_case;

            let {url_params, body} = data;


            let res = req_type !== 'GET' ? await fetch(`${domain}${end_point}`,{
                    method: req_type,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': cookie_str
                    },
                    body: JSON.stringify(body)
                }
            ) : 
            await fetch(`${domain}${end_point}/${url_params.join('/')}`,
                {
                    method: req_type,
                    headers: {'Cookie': cookie_str}
                }
            );

            let result_cookies = res.headers.getSetCookie();

            await Store_Cookie(result_cookies);

            cookie_str = await Convert_Cookie_To_String();

            if(!res.ok || show_result){

                let results = {};

                try {

                    results = await res.json();

                } catch(e){

                    console.log(e);

                }

                console.log("++++++++++++++++++++++++++++++++++++");

                console.log(`\nTest Case: ${description}\n`);

                console.log("Results: ", results, "\n");

                console.log("++++++++++++++++++++++++++++++++++++");

                console.log(`\n`);

            }

            if(!res.ok){

                failed_cases++;

            }

        }

        let end_time = Date.now() - start_time;
        let cases_passed = test_cases.length - failed_cases;

        console.log("**********************************");
        console.log("End point: ", end_point, "\n");
        console.log(cases_passed, " out of ", test_cases.length, " test cases passed");
        console.log("**********************************");
        console.log(`${end_time}ms`);

        total_time += end_time;

        
        console.log("Test Index: ", test_index);
        console.log('\n\n');

        if(failed_cases > 0){
            attentions.push({"End Point": end_point, "Success Rate": `${cases_passed}/${test_cases.length}`, "Index": test_index});
        }

        test_index++
    }

}

async function Test_Insert_Delete_Engine(root){

    let test_unit_options = [];

    await Traversal(root, test_unit_options);

    //Function for sending request
    let Send_Request = async ({end_point, body, url_params, req_type, is_files}) => {
        
        let option = req_type === "GET" || req_type === "DELETE"? {
            method: req_type,
            headers: {
                'Cookie': cookie_str
            }
        } : {
            method: req_type,
            body: is_files ? body : JSON.stringify(body),
            headers: is_files ? {
                'Cookie': cookie_str
            }:
            {
                'Content-Type': 'application/json',
                'Cookie': cookie_str
            }
        }

        return await fetch(`${domain}${end_point}/${url_params.join("/")}`, option);

    };

    for(let option_pair of test_unit_options){

        let [insert_op, erase_op] = option_pair.default;

        let {req_type: insert_req_type, end_point: insert_end_point, test_cases: insert_test_cases} = insert_op;
        let {req_type: erase_req_type, end_point: erase_end_point, test_cases: erase_test_cases} = erase_op;

        let failed_insert_cases = 0;
        let failed_erase_cases = 0;

        let start = Date.now();

        if(insert_test_cases.length !== erase_test_cases.length){
            console.log(
                "The number of test cases for INSERT ", 
                insert_end_point,
                " is different from DELETE",
                erase_end_point
            )
            continue;
        }

        console.log("Test Index: ", test_index);

        for(let i = 0; i < insert_test_cases.length; i++){

            let {data: insert_data, description: insert_description} = insert_test_cases[i];
            let {data: erase_data, description: erase_description} = erase_test_cases[i];

            let {url_params: insert_url_params, body: insert_body, is_files} = insert_data;
            let {url_params: erase_url_params, body: erase_body, required_from_insert} = erase_data;

            let insert_res = await Send_Request({
                end_point: insert_end_point, 
                body: insert_body, 
                url_params: insert_url_params, 
                req_type: insert_req_type,
                is_files
            });

            let insert_results = {};

            try {

                insert_results = await insert_res.json();

            } catch(e){

                console.log(e);

            }

            if(!insert_res.ok){

                console.log("+++++++++++Insert Failed Case++++++++++++");
                console.log('Insert Test Case Description: ', insert_description);
                console.log('Insert Test Case Results', insert_results)
                console.log("+++++++++++++++++++++++++++++++++++++++++");

                failed_insert_cases++;
            }

            //Copy any data to the erase body from the insert request if there is any needed
            for(let need of required_from_insert){

                let {name_from_insert, name_for_delete} = need;

                let value_from_insert;

                if(typeof name_from_insert === 'object'){

                    let [name1, name2] = name_from_insert

                    value_from_insert = insert_results[name1][name2];

                } else {

                    value_from_insert = insert_results[name_from_insert];

                }

                if(name_for_delete === "params"){

                    erase_url_params.push(value_from_insert);

                    continue;

                }
                
                erase_body[name_for_delete] = value_from_insert;

            }

            let erase_res = await Send_Request({
                end_point: erase_end_point,
                body: erase_body,
                url_params: erase_url_params,
                req_type: erase_req_type
            });

            let erase_results = {}; 

            try {

                erase_results = await erase_res.json();

            }catch(e){

                console.log(e);

            }

            if(!erase_res.ok){

                console.log("+++++++++++Delete Failed Case++++++++++++");
                console.log('Insert Test Case Description: ', erase_description);
                console.log('Insert Test Case Results', erase_results)
                console.log("+++++++++++++++++++++++++++++++++++++++++");

                failed_erase_cases++;
            }
        }

        let end = Date.now() - start;

        let insert_cases_passed = insert_test_cases.length - failed_insert_cases;
        let erase_cases_passed = erase_test_cases.length - failed_erase_cases;

        console.log("*********Insert Cases Passed***********");
        console.log("End point: ", insert_end_point, "\n");
        console.log(insert_cases_passed, " out of ", insert_test_cases.length, " test cases passed");
        console.log("***************************************");

        console.log("\n");

        console.log("*********Erase Cases Passed***********");
        console.log("End point: ", erase_end_point, "\n");
        console.log(erase_cases_passed, " out of ", erase_test_cases.length, " test cases passed");
        console.log("***************************************");
        console.log(`${end}ms`);

        total_time += end;

        
        console.log("Test Index: ", test_index);
        console.log("\n\n");

        if(failed_insert_cases > 0){
            attentions.push({"End Point": insert_end_point, "Success Rate": `${insert_cases_passed}/${insert_test_cases.length}`, "Index": test_index});
        }

        if(failed_erase_cases > 0){
            attentions.push({"End Point": erase_end_point, "Success Rate": `${erase_cases_passed}/${erase_test_cases.length}`, "Index": test_index});
        }

        test_index++;
    }


}

async function Test_All_Wrapper() {

    let start = Date.now();

    await Test_Update_Get_Engine('./Update_Get_Requests');
    await Test_Insert_Delete_Engine('./Insert_Delete_Requests');

    let end = Date.now() - start;


    console.log("+++THE FOLLOWING END POINTS THAT NEEDED ATTENTIONS!+++\n");

    if(attentions.length === 0){
        console.log("None - All Cleared\n");
    }

    for(let att of attentions){

        console.log('End Point: ' + att["End Point"]);
        console.log("At Index: " + att["Index"]);
        console.log('Success Rate: ' + att["Success Rate"]);
        console.log("\n");
    }
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");

    console.log(`Total time: ${end}ms`);
    console.log(`Calculated accumulative time: ${total_time}ms`);

    console.log('\n\n');

}

Test_All_Wrapper();