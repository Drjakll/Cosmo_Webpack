import React, {Component} from 'react';


class Choice_Type extends Component {

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
                <div id="choice-type" className="info">
                    
                    <div className="value-wrapper">
                        
                        <div className="value">
                            
                            {this.state.value != "null" ? this.state.value : ""}
                            
                        </div>
                
                    </div>
                    
                </div>
            );
    }
}

export default Choice_Type;