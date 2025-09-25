import React, {Component} from 'react';
import './entrance_options.less';
import Login_Account from './Login_Account/login_account.js';
import Logged_In_Account from './Logged_In_Account/logged_in_account.js';


class Entrance_Options extends Component {
    
    Screen_Options = {
        "Login Account": Login_Account,
        "Logged In Account": Logged_In_Account
    };
    
    state = {
        selected_screen: "Logged In Account",
        account_info: null
    };
    
    constructor(props){
        
        super(props);

        window.LoginAttempt = this.LoginAttempt;
        
        Entrance_Options.contextType = window.Context;
        
    }
    
    LoginAttempt = async () => {
        
        const {Cookie_Tools, Request_URLs, Configurations} = this.context;
        
        let cookie_data = Cookie_Tools.cookie_parser(document.cookie);
        
        let email = cookie_data?.email;
        let password = cookie_data?.password;
        
        if(!email || !password){
            this.setState({selected_screen: "Login Account"});
            return;
        }
        
        let accJsonData = {email: email, password: password};
        
        let res = await fetch(Request_URLs.login_account, {
           method: "POST",
           body: JSON.stringify(accJsonData),
           headers: {
               'Content-Type': "application/json"
           }
        });
        
        let resJson = await res.json();
        
        let { acc_info, message } = resJson;
        
        if(acc_info){

            await this.setState({selected_screen: "Logged In Account", account_info: acc_info});
        
            let date = new Date();

            //Setting the expiration date that's set on the configurations
            date.setTime(date.getTime() + Configurations.Cookie_Expire_Days * 24 * 60 * 60 * 1000);

            //Convert the account data into cookie strings
            const cookieStrs = Cookie_Tools.cookie_converter(acc_info, {"expires":date.toUTCString(), "path": "/"});

            //Store the cookie strings into cookie
            for(let cookieStr of cookieStrs){
                document.cookie = cookieStr;
            }
            
        } else {
            
            this.setState({selected_screen: "Login Account"});
            
        }

        return acc_info;
    }
    
    componentDidMount(){
        
        this.LoginAttempt();
        
    }
    
    render(){
        
        let Selected_Screen = this.Screen_Options[this.state.selected_screen];
        
        Selected_Screen = Selected_Screen ? Selected_Screen : this.Screen_Options["Login Account"];
        
        return (
                <div id="entrance-options">
                    
                    <Selected_Screen account_data={this.state.account_info}/>
                    
                </div>
            );
    }
}

export default Entrance_Options;