import React, {Component} from 'react';
import './login_account.less';
import Buttons from './Buttons/buttons.js';
import Create from './Create/create.js';
import Login from './Login/login.js';
import Restore from './Restore/restore.js';


class Login_Account extends Component {
    
    Selections = {
        "Create": Create,
        "Login": Login,
        "Restore": Restore,
        "Buttons": Buttons
    };
    
    state = {
        selected: "Buttons"
    };
    
    constructor(props){
        
        super(props);

        Login_Account.contextType = window.Context;
    }
    
    ChangeScreen = (screen) => {
        
        this.setState({selected: screen});
        
    }
    
    render(){
        
        const {Logo} = this.context;
        
        const Selected_Screen = this.Selections[this.state.selected];
        
        return (
                <div id="login-account">
                        
                     <div id="logo-wrapper">   

                        <Logo sizeScale={{x: 3, y: 15}} ratio={1} top={25}/>

                        <div id="slogan">

                            Unite our differences through understanding - Cosmopolitanism
                            
                        </div>

                    </div>

                     <div id="account-buttons-wrapper">

                        <Selected_Screen ChangeScreen={this.ChangeScreen} />

                    </div>
                    
                </div>
            );
    }
}

export default Login_Account;