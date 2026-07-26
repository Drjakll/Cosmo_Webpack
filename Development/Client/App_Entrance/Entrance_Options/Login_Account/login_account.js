import React, {Component} from 'react';
import './login_account.less';
import Buttons from './Buttons/buttons.js';
import Create from './Create/create.js';
import Login from './Login/login.js';
import Restore from './Restore/restore.js';
import Logo from '@logo';


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
    }
    
    ChangeScreen = (screen) => {
        
        this.setState({selected: screen});
        
    }
    
    render(){
        
        
        const Selected_Screen = this.Selections[this.state.selected];

        let {selected} = this.state;
        
        return (
                <div id="login-account">
                        
                    <div id="logo-wrapper">   

                        <Logo style={{}}/>

                        <div id="slogan">

                            Uniting our differences through understanding
                            
                        </div>

                    </div>

                     <div id="account-buttons-wrapper">

                        {selected === "Buttons" ? "" : <div className="back-button-wrapper">

                            <label onClick={(e)=>{ this.ChangeScreen("Buttons"); }}>Back</label>

                        </div>}

                        <Selected_Screen ChangeScreen={this.ChangeScreen} />

                    </div>
                    
                </div>
            );
    }
}

export default Login_Account;