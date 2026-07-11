import Cookie_Tools from '@root/Utilities/cookie.js';
import Configurations from '@root/Utilities/configurations.js';
import Request_URLs from '@root/API_Requests/request_urls.js';
import Account_Templates from '@data_templates/account_data.js';

let {Account_Data_Template} = Account_Templates;

let Login = async (document, input_email, input_password) =>{
        
        let cookie_data = Cookie_Tools.cookie_parser(document.cookie);
        
        let {email, password, session_id} = input_email && input_password ? 
                                                {email: input_email, password: input_password} : cookie_data;
        
        if(!email && (!session_id || !password)){
            return null; //Account_Data_Template();
        }
        
        let acc_credentials = {email, password, session_id};
        
        let {acc_info: account, message} = await (await fetch(
                                        Request_URLs.login, 
                                        {
                                            method: "POST",
                                            body: JSON.stringify(acc_credentials),
                                            headers: {
                                                'Content-Type': "application/json"
                                            }
                                        })
                                    ).json();

        let date = new Date();


        if(account){

            //Setting the expiration date that's set on the configurations
            date.setTime(date.getTime() + Configurations.Cookie_Expire_Days * 24 * 60 * 60 * 1000);

            let {email, id, session_id} = account;

            //Saving session email, and session_id only, no password
            let acc_info_auth = {email, id, session_id};

            //Convert the account_data_copy into cookie strings
            const cookieStrs = Cookie_Tools.cookie_converter(acc_info_auth, {"expires": date.toUTCString(), "path": "/"});

            //Store the cookie strings into cookie
            for(let cookieStr of cookieStrs){
                document.cookie = cookieStr;
            }
            
        }   

        return account || Account_Data_Template();
};

export default Login;