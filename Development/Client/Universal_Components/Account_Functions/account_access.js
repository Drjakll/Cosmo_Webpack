import Request_URLs from '@root/API_Requests/request_urls.js';


const Login = async (input_email, input_password) =>{
        
        
        let acc_credentials = {email: input_email || "", password: input_password || ""};
        
        let {acc_info: account, message} = await (await fetch(
                                        Request_URLs.login, 
                                        {
                                            method: "POST",
                                            credentials: "same-origin",
                                            body: JSON.stringify(acc_credentials),
                                            headers: {
                                                'Content-Type': "application/json"
                                            }
                                        })
                                    ).json();

        return account;
};

const Logout = async ()=>{
    
    await fetch(Request_URLs.logout, { method: "GET"});
};

export {Login, Logout};