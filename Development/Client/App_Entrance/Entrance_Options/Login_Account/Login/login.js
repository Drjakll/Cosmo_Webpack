import React, {Component, createRef} from 'react';
import login_account from '@universal_components/Account_Functions/login_account.js';
import Context from '@context/context.js';


class Login extends Component {
    
    emailRef = createRef();
    passwordRef = createRef();
    
    constructor(props){
        
        super(props);
        
        Login.contextType = Context;
    }
    
    ChangeScreen = (screen) => {
        
        this.props.ChangeScreen(screen);
        
    }
    
    Submit = async () => {
        
        let email = this.emailRef?.current.value;
        let password = this.passwordRef?.current.value;
        
        await login_account(document, email, password);
        
        window.location.reload();

    }
    
    render(){
        
        return (
                <div id="login">

                    <div className="screen-title-wrapper">
                        
                        <label>Login</label>
                        
                    </div>

                    <div className="account-inputs-wrapper">
                    
                        <div className="account-input">

                            <label>Email</label>

                            <input type="email" ref={this.emailRef}/>

                        </div>

                        <div className="account-input">

                            <label>Password</label>

                            <input type="password" ref={this.passwordRef}/>

                        </div>
                    
                    </div>
                    
                    <div className="account-buttons-wrapper">
                        
                        <div className="account-button" onClick={(e)=>{this.Submit(); }}>Login</div>
                        
                    </div>

                </div>
            );
    }
}

export default Login;