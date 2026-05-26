import React, {Component} from 'react';
import Login from '@root/Universal_Components/Account_Functions/login_account.js';
import Context from '@context/context.js';
import './entrance_options.less';
import Login_Account from './Login_Account/login_account.js';
import Logged_In_Account from './Logged_In_Account/logged_in_account.js';


class Entrance_Options extends Component {
    
    Screen_Options = {
        "Login Account": Login_Account,
        "Logged In Account": Logged_In_Account
    };
    
    
    constructor(props){
        
        super(props);

        window.Refresh_Login = this.Refresh_Login;
        
        Entrance_Options.contextType = Context;

        this.state = {
            selected_screen: "Login Account",
            owner_user_account: null
        };
        
    }    
    
    componentDidMount(){
        
        this.Refresh_Login();
        
    }
    
    Refresh_Login = async () => {
        
        let account = await Login(document);
        
        if(account){

            await this.setState({
                selected_screen: "Logged In Account", 
                owner_user_account: account
            });
            
        } else {
            
            this.setState({selected_screen: "Login Account"});
            
        }

        return account;

    }

    Change_Screen = (screen_name) => {
        this.setState({selected_screen: screen_name});
    }
    
    render(){

        let {selected_screen, owner_user_account} = this.state;
        
        let Selected_Screen = this.Screen_Options[selected_screen];
        
        Selected_Screen = Selected_Screen ? Selected_Screen : this.Screen_Options["Login Account"];
        
        return (
                <div id="entrance-options">
                    
                    <Selected_Screen owner_user_account={owner_user_account} 
                                    visitor_user_account={owner_user_account} 
                                    Change_Screen={this.Change_Screen}
                                />
                    
                </div>
            );
    }
}

export default Entrance_Options;