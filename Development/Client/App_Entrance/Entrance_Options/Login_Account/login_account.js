import React, {Component} from 'react';
import './login_account.less';
import Buttons from './Buttons/buttons.js';
import Create from './Create/create.js';
import Login from './Login/login.js';
import Restore from './Restore/restore.js';
import Context from '@context/context.js';


class Login_Account extends Component {

    static contextType = Context;
    
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

                        <Logo style={{}}/>

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