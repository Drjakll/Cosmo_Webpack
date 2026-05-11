import React, {Component, createRef} from 'react';
import './logo.less';

class Logo extends Component {
    
    state = {
        fontSize: 1,
        width: 12.5,
        height: 4,
        borderRadius: 50,
        padding: {h: 0.8, v: 0.4}
    }
    
    constructor(props){
        
        super(props);
    }
    
    render(){
        
        return <div id="logo" 
                    style={{
                        
                    }}
        >
        
            <div id="cos">Cos</div>
            <div id="mo">mo</div>
        
        </div>;
    }
}

export default Logo;