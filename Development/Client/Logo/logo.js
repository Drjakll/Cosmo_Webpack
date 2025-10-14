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
                        fontSize: `calc(${this.props.sizeScale} * (${this.state.fontSize}vh + ${this.state.fontSize}vw)`, 
                        width: `calc(${this.state.width}vw * ${this.props.sizeScale / this.props.ratio})`,
                        height: `calc(${this.state.height}vh * ${this.props.sizeScale})`,
                        borderRadius: `${this.state.borderRadius * this.props.sizeScale}px`,
                        paddingLeft: `calc((${this.state.padding.h}vw) * ${this.props.sizeScale})`,
                        paddingRight: `calc((${this.state.padding.h}vw) * ${this.props.sizeScale})`,
                        paddingTop: `calc((${this.state.padding.v}vh) * ${this.props.sizeScale})`,
                        paddingBottom: `calc((${this.state.padding.v}vh) * ${this.props.sizeScale})`,
                        top: `${this.props.top ? this.props.top : 0}px`,
                        left: `${this.props.left ? this.props.left : 0}px`
                        
                    }}
        >
        
            <div id="cos">Cos</div>
            <div id="mo">mo</div>
        
        </div>;
    }
}

export default Logo;