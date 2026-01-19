import Cookie_Tools from '@root/Utilities/cookie.js';
import Configurations from '@root/Utilities/configurations.js';
import Request_URLs from '@root/API_Requests/request_urls.js';

let Login = async (document) =>{
        
        let cookie_data = Cookie_Tools.cookie_parser(document.cookie);
        
        let email = cookie_data?.email;
        let password = cookie_data?.password;
        
        if(!email || !password){
            this.setState({selected_screen: "Login Account"});
            return;
        }
        
        let acc_credentials = {email: email, password: password};
        
        let {acc_info: account} = await (await fetch(
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

            //saving only the email and password
            let acc_info_auth = {email: account.email, password: account.password};

            //Convert the account_data_copy into cookie strings
            const cookieStrs = Cookie_Tools.cookie_converter(acc_info_auth, {"expires": date.toUTCString(), "path": "/"});

            //Store the cookie strings into cookie
            for(let cookieStr of cookieStrs){
                document.cookie = cookieStr;
            }
            
        }   

        return account;
};

export default Login;