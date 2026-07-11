import React, {Component, createRef} from 'react';
import './logo.less';

class Logo extends Component {

    constructor(props){
        
        super(props);
    }
    
    render(){

        let {style} = this.props;
        
        return <div id="logo" 
                    style={style.wrapper || {}}
        >
        
            <div id="cos" style={style.cos || {}}>Cos</div>
            <div id="mo" style={style.mo || {}}>mo</div>
        
        </div>;
    }
}

export default Logo;