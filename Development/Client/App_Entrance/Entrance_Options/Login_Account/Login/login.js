import React, {Component, createRef} from 'react';


class Login extends Component {
    
    emailRef = createRef();
    passwordRef = createRef();
    
    constructor(props){
        
        super(props);
        
        Login.contextType = window.Context;
    }
    
    ChangeScreen = (screen) => {
        
        this.props.ChangeScreen(screen);
        
    }
    
    Submit = async () => {
        
        let email = this.emailRef?.current.value;
        let password = this.passwordRef?.current.value;
        
        const {Data_Templates, Request_URLs, Cookie_Tools, Configurations} = this.context;
        
        //Verify email
        if(!Configurations.Verify_Email(email)){
            alert("Please Enter a valid email");
            return;
        }
        
        //Create a json data template to hold account information
        let account_data = Data_Templates.Account_Data_Template({email: email, password: password});
        
        let jsonData = JSON.stringify(account_data);
        
        let res = await fetch(Request_URLs.login_account, {
           method: "POST",
           body: jsonData,
           headers: {
               'Content-Type': "application/json"
           }
        });
        
        let resJson = await res.json();
        
        let {acc_info, message} = resJson;
        
        if(!acc_info){
            alert(message);
            return;
        }
        
        let date = new Date();
        
        //Setting the expiration date that's set on the configurations
        date.setTime(date.getTime() + Configurations.Cookie_Expire_Days * 24 * 60 * 60 * 1000);
        
        //Convert the account data into cookie strings
        const cookieStrs = Cookie_Tools.cookie_converter(acc_info, {"expires":date.toUTCString(), "path": "/"});
        
        //Store the cookie strings into cookie
        for(let cookieStr of cookieStrs){
            document.cookie = cookieStr;
        }
        
        window.location.reload();

    }
    
    render(){
        
        return (
                <div id="login">
        
                    <div className="back-button-wrapper">

                        <label onClick={(e)=>{ this.ChangeScreen("Buttons"); }}>Back</label>

                    </div>

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