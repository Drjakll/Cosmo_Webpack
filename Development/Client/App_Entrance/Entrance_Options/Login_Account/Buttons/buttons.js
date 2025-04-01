import React, {Component} from 'react';
import './buttons.less';

class Buttons extends Component {
    
    constructor(props){
        
        super(props);

    }
    
    ChangeScreen = (screen)=>{
        
        this.props.ChangeScreen(screen);
        
    }
    
    render(){
        
        return (
                <div id="buttons">
                    
                    <div id="login-button" className="button" onClick={(e)=>{this.ChangeScreen("Login")}}>
                        Login
                    </div>
                    
                    <div id="create-button" className="button" onClick={(e)=>{this.ChangeScreen("Create")}}>
                        Create
                    </div>
                    
                    <div id="restore-button" className="button" onClick={(e)=>{this.ChangeScreen("Restore")}}>
                        Restore
                    </div>     
                    
                </div>
            );
    }
}

export default Buttons;