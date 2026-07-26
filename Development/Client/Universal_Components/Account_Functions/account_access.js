import Request_URLs from '@request_urls';
import Account_Data from '@account_data';


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

        
        const {Account_Data_Template} = Account_Data;

        return account ? Account_Data_Template(account) : null;
};

const Logout = async ()=>{
    
    await fetch(Request_URLs.logout, { method: "GET"});
};

export {Login, Logout};
export default {Login, Logout};