import React, {Component} from 'react';
import Context from '@context/context.js';
import Text from '../Text/text.js';
import Date from '../Date/date.js';
import Choice from '../Choice/choice.js';
import './json.less';

class Json extends Component {

    constructor(props){

        super(props);

        this.value = {};

        this.state = {

        };

        Json.contextType = Context;
    }

    Input_Data_Types = {
        "string" : (key_label)=>{
            
            return <div className="input-data-type string">
            
                <text Save_To_Search={this.Save_To_Search} key_index={key_label} />
            
            </div>;

        },
        "date" : (key_label)=>{
            
            return <div className="input-data-type date">
            
                <Date Save_To_Search={this.Save_To_Search} key_index={key_label} />
                
            </div>;
        },
        "enum" : (key_label)=>{

            return <div className="input-data-type enum">

                <Choice Save_To_Search={this.Save_To_Search} key_index={key_label} />

            </div>;
        }
    }

    Save_To_Search = (value, label)=>{

        let {Save_To_Search, key_index} = this.props;

        this.value[label] = value;

        Save_To_Search(this.value, key_index);

    }

    Remove_Search_Parameter = (e)=>{

        let {Remove_Search_Parameter, key_index} = this.props;

        Remove_Search_Parameter(key_index);

    }    

    render(){

        let {options} = this.props;

        return <div id="search-json-input-wrapper">

            <div id="label-wrapper">

                <label id="search-label">{this.props.label}</label>

            </div>

            <div id="input-wrapper">
            
                {options.map((item, index)=>{
                    
                    let {label, data_type} = item;
                    
                    return <div className="input-item" key={index}>

                        <div id="label">
                            {label}
                        </div>
                        
                        <div id="value">

                            {this.Input_Data_Types[data_type](label)}

                        </div>

                    </div>;
                    
                })}
                
            </div>

            <div id="search-button-wrapper">

                <button onClick={this.Remove_Search_Parameter}>Remove</button>

            </div>


        </div>;
    }
}

export default Json;