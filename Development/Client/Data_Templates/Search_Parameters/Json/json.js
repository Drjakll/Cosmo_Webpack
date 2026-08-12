import React, {Component} from 'react';
import Text from '../Text/text.js';
import Date from '../Date/date.js';
import Choice from '../Choice/choice.js';
import './json.less';

class Json extends Component {

    constructor(props){

        super(props);

        this.value = {};

        this.state = {
            collapsed: true
        };
        
    }

    Input_Data_Types = {
        "string" : (key_label, name_label, choices)=>{
            
            return <div className="input-data-type string">
            
                <Text Save_To_Search={this.Save_To_Search} key_index={key_label} label={name_label} options={choices}/>
            
            </div>;

        },
        "date" : (key_label, name_label, choices)=>{
            
            return <div className="input-data-type date">
            
                <Date Save_To_Search={this.Save_To_Search} key_index={key_label} label={name_label} options={choices}/>
                
            </div>;
        },
        "enum" : (key_label, name_label, choices)=>{

            return <div className="input-data-type enum">

                <Choice Save_To_Search={this.Save_To_Search} key_index={key_label} label={name_label} options={choices}/>

            </div>;
        }
    }

    Save_To_Search = (value, label)=>{

        let {Save_To_Search, key_index} = this.props;

        this.value[label] = value;

        Save_To_Search(this.value, key_index);

    }

    render(){

        let {options} = this.props;
        let {collapsed} = this.state;

        return <div id="search-json-input-wrapper" 
                    className={`${collapsed ? "collapsed" : ""}`}
                >

            <div id="json-label-wrapper" 
                    onClick={(e)=>{ this.setState({collapsed: !collapsed})}}>

                <label id="search-label">{this.props.label}</label>

            </div>

            <div id="input-wrapper">
            
                {options.map((item, index)=>{
                    
                    let {label, data_type, data_name, choices} = item;
                    
                    return <div className="input-item" key={index}>
                        

                        {this.Input_Data_Types[data_type](data_name, label, choices)}


                    </div>;
                    
                })}
                
            </div>


        </div>;
    }
}

export default Json;