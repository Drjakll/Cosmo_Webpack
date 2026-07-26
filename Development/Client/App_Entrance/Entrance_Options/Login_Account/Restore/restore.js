import React, {Component, createRef} from 'react';
import popup_msg from '@popup_message';
import Request_URLs from '@request_urls';

class Restore extends Component {



    
    constructor(props){
        
        super(props);

        this.emailRef = createRef();

    }
    
    Submit = async () => {

        let email = this.emailRef.current.value;

        if(!email){
            popup_msg("message", "Please enter your email");
            return;
        }

        let {recover_account} = Request_URLs;  

        let response = await fetch(recover_account, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });

        let data = await response.json();

        let {message, failed} = data;

        await popup_msg("message", message);

    }
    
    render(){
        
        return (
                <div id="restore">
                    
                     <div className="screen-title-wrapper">
                        
                        <label>Account Recovery</label>
                        
                    </div>

                    <div className="account-inputs-wrapper">
                    
                        <div className="account-input">

                            <label>Email</label>

                            <input type="email" ref={this.emailRef}/>

                        </div>

                    </div>

                    <div className="account-buttons-wrapper">
                        
                        <div className="account-button" onClick={(e)=>{this.Submit(); }}>Submit</div>
                        
                    </div>
                    
                </div>
            );
    }
}

export default Restore;