import React, {Component} from 'react';


class Date_Type extends Component {

    state = {
        label: "",
        value: null
    };    
    
    
    constructor(props){
        
        super(props);

        Date_Type.contextType = window.Context;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        for(let i in this.props){
            
            this.state[i] = this.props[i];
        }
        
        
        if(this.state.value){
            this.state.value = this.ParseDate(this.state.value);
        }
        
        this.setState(this.state);
    }
    
    ParseDate = (dateStr) => {
        
        const {Configurations} = this.context;
        
        const {Months} = Configurations;
        
        let date = dateStr.split("T")[0];
        
        let parts = date.split("-");
        
        return `${Months[parseInt(parts[1]) - 1]} ${parts[2]}, ${parts[0]}`;
        
    }
    
    render(){
        
        return (
                <div id="date-type" className="info">
                    
                    <div className="value-wrapper">
                    
                        <div className="value">
                            
                            {this.state.value}
                            
                        </div>
                
                    </div>
                    
                </div>
            );
    }
}

export default Date_Type;