import React, {Component, createRef} from 'react';


class Create extends Component {
    
    emailRef = createRef();
    passwordRef = createRef();
    firstNameRef = createRef();
    lastNameRef = createRef();
    
    constructor(props){
        
        super(props);

        Create.contextType = window.Context;
    }

   ChangeScreen = (screen) => {
        
        this.props.ChangeScreen(screen);
        
    }
    
    Submit = async () => {
        
        let email = this.emailRef?.current.value;
        let password = this.passwordRef?.current.value;
        let first_name = this.firstNameRef?.current.value;
        let last_name = this.lastNameRef?.current.value;
        
        
        
        const {Account_Data_Templates, Request_URLs, Configurations} = this.context;
        
        //Verify email
        if(!Configurations.Verify_Email(email)){
            alert("Please Enter a valid email");
            return;
        }
        
        //Verify password
        if(!Configurations.Verify_Password(password)){
            alert("Does not satisfy password requirements");
            return;
        }
        
        //Create a json data template to hold account information
        let account_data = Account_Data_Templates.Account_Data_Template({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        });
        
        let jsonData = JSON.stringify(account_data);
        
        let res = await fetch(Request_URLs.create_account, {
           method: "POST",
           body: jsonData,
           headers: {
               'Content-Type': "application/json"
           }
        });
        
        let resJson = await res.json();
        
        let {success, message} = resJson;
        
        alert(message);
        
        if(!success){
            return;
        }
        
        this.ChangeScreen("Buttons");
        
    }
    
    render(){
        
        return (
                <div id="create">

                    <div className="back-button-wrapper">

                        <label onClick={(e)=>{ this.ChangeScreen("Buttons"); }}>Back</label>

                    </div>

                    <div className="screen-title-wrapper">
                        
                        <label>Create Account</label>
                        
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
                        
                        <div className="account-input">

                            <label>First Name</label>

                            <input type="text" ref={this.firstNameRef}/>

                        </div>
                        
                        <div className="account-input">

                            <label>Last Name</label>

                            <input type="text" ref={this.lastNameRef}/>

                        </div>
                    
                    </div>
                    
                    <div className="account-buttons-wrapper">
                        
                        <div className="account-button" onClick={(e)=>{this.Submit(); }}>Create</div>
                        
                    </div>
                    
                    
                </div>
            );
    }
}

export default Create;