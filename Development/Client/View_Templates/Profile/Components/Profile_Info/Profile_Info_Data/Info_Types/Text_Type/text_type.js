import React, {Component} from 'react';


class Text_Type extends Component {
    
    state = {
        label: "",
        value: null
    };
    
    constructor(props){
        
        super(props);

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        for(let i in this.props){
            
            this.state[i] = this.props[i];
        }
        
        this.setState(this.state);
    }
    
    render(){
        
        return (
                <div id="text-type" className="info">
                    
                    <div className="value-wrapper">
                        
                        <div className="value">
                            
                            {this.state.value}
                            
                        </div>
                
                    </div>
                    
                </div>
            );
    }
}

export default Text_Type;