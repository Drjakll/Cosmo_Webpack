import React, {Component} from 'react';
import './entrance_options.less';
import Login_Account from './Login_Account/login_account.js';


class Entrance_Options extends Component {
    
    constructor(props){
        
        super(props);

    }
    
    componentDidMount(){
        
    }
    
    render(){
        
        return (
                <div id="entrance-options">
                    
                    <Login_Account/>
                    
                </div>
            );
    }
}

export default Entrance_Options;