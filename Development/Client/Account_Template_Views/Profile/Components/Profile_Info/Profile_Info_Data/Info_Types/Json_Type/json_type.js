import React, {Component} from 'react';
import './json_type.less';

class Json_Type extends Component {

    state = {
        label: "",
        value: null,
        show_popup: false
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
    
    Pop_Up = () => { 
        
        let array_data = [];
        
        if(this.state.value){
            try {
                array_data = JSON.parse(this.state.value);
                array_data = array_data ? array_data : [];
            } catch(e){
                console.log(e);
                array_data = [];
            }
        }
        
        return <div id="json-type-popup">
        
            <div id="json-info-details">
                
                <div id="json-data-label">
                    {this.state.label}
                </div>
                
                <div id="details">
        
                    {array_data.map((json_obj, index_0)=>{
                        
                        return <div className="detail-wrapper" key={index_0}>
                           
                            <div id="detail-index">
                                
                                #{index_0 + 1}
                                
                            </div>
                        
                            <div id="detail-segments-wrapper">
                        
                                {Object.keys(json_obj).map((key, index_1)=>{

                                    return <div className="detail-segment" key={index_1}>

                                        <div id="detail-segment-label">

                                            {key}

                                        </div>

                                        <div id="detail-segment-value">

                                            {json_obj[key]}

                                        </div>

                                    </div>;

                                })}
                            
                            </div>
                            
                        </div>;
                        
                    })}
        
                </div>
                
            </div>
        
            <div id="popup-wrapper" onClick={(e)=>{this.setState({show_popup: false}); }}>
       
        
            </div>
        
        </div>;
    }
    
    render(){
        
        return (
                <div id="json-type" className="info">
                
                    {this.state.show_popup ? this.Pop_Up() : <></>}
                    
                    <div id="value-wrapper">
                    
                        <div id="show-button" onClick={(e)=>{this.setState({show_popup: true}); }}>
                            
                            Show
                            
                        </div>
                
                    </div>
                    
                </div>
            );
    }
}

export default Json_Type;