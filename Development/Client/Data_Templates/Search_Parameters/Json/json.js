import React, {Component} from 'react';
import './json.less';

class Json extends Component {

    constructor(props){

        super(props);

        this.value = {};

        this.state = {
            date_value: ""
        };

        Json.contextType = window.Context;
    }

    Input_Data_Types = {
        "string" : (key_label)=>{
            
            let onChange = (e) => {
                
                this.value[key_label] = e.target.value;
                
                this.Save_To_Search(this.value);
                
            };
            
            return <div className="input-data-type string">
            
                <input type="text" onChange={onChange} />
            
            </div>;

        },
        "date" : (key_label)=>{
            
            const {Calendar} = this.context;
            
            let onChange = ({selected_year, selected_month, date}) => {

                this.value[key_label] = `${selected_year}-${selected_month}-${date}`;
                
                this.Save_To_Search(this.value);

                this.setState({date_value: this.value[key_label]});
                
            };
           
            
            return <div className="input-data-type date">
            
                <div id="selected-date">
                    
                    {this.state.date_value || "Select a date"}
                    
                </div>
                
                <div id="dropdown">
                
                    <Calendar capture_date={onChange} />
                    
                </div>
                
            </div>;
        }
    }

    Save_To_Search = (value)=>{

        let {Save_To_Search, key_index} = this.props;

        Save_To_Search(value, key_index, "json", "=");

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