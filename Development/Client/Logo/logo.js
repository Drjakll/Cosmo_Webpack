import React, {Component, createRef} from 'react';
import './logo.less';

class Logo extends Component {
    
    state = {
        fontSize: 36,
        width: 100,
        height: 25,
        borderRadius: 50,
        padding: 15
    }
    
    constructor(props){
        
        super(props);
    }
    
    render(){
        
        return <div id="logo" 
                    style={{
                        fontSize: `${this.props.sizeScale * this.state.fontSize}px`, 
                        width: `${this.state.width * this.props.sizeScale}px`,
                        height: `${this.state.height * this.props.sizeScale}px`,
                        borderRadius: `${this.state.borderRadius * this.props.sizeScale}px`,
                        padding: `${this.state.padding * this.props.sizeScale}px`
                    }}
        >
        
            <div id="cos">Cos</div>
            <div id="mo">mo</div>
        
        </div>;
    }
}

export default Logo;