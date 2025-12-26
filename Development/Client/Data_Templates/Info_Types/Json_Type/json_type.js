import React, {Component} from 'react';
import Context from '@context/context.js';
import './json_type.less';

class Json_Type extends Component {

    
    constructor(props){
        
        super(props);

        Json_Type.contextType = Context;

        let {label, value} = props;

        this.state = {
            label,
            value
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps || this.props.value === prevProps.value){
            return;
        }
        
        this.setState(this.props);
    }

    Delete_Item = null

    Editor = null;

    Contents = () => { 
        
        let {value, label} = this.state;
        

        return <div id="json-type-contents">

            <div id="json-info-details">

                <div id="json-data-label">
                    {label}
                </div>

                {this.Editor && this.Editor()}

                <div id="details">

                    {value?.map((table, index_0) => {

                        return <div className="detail-wrapper" key={index_0}>

                            <div id="detail-index">

                                {index_0 + 1}

                            </div>

                            <div id="detail-segments-wrapper">

                                {Object.keys(table).map((key, index_1) => {

                                    return <div className="detail-segment" key={index_1}>

                                        <div id="detail-segment-label">

                                            {key}

                                        </div>

                                        <div id="detail-segment-value">

                                            {table[key]}

                                        </div>

                                    </div>;

                                })}

                            </div>

                            {this.Delete_Item !== null ? 

                                <div id="delete-button-wrapper">

                                    <div id="delete-button" onClick={(e) => { this.Delete_Item(table.id); }}>
                                        Delete
                                    </div>

                                </div> 

                            : ""}

                        </div>;

                    })}

                </div>

            </div>

        </div>;
    }
    
    render(){
        
        return (
            <div id="json-type">
                    
                <div id="value-wrapper">
                    
                    <div id="show-button" onClick={(e)=>{ this.props.change_main_display(this.Contents); }}>
                            
                        Show
                            
                    </div>
                
                </div>
                    
            </div>
        );
    }
}

export default Json_Type;