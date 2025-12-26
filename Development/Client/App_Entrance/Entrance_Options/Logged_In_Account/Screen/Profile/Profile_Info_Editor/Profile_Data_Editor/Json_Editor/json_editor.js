import React, { Component } from 'react';
import Context from '@context/context.js';
import Json_Data from '@data_templates/Info_Types/Json_Type/json_type.js';
import './json_editor.less';

class Json_Editor extends Json_Data {

    constructor(props) {

        super(props);
        
        Json_Editor.contextType = Context;
        
        let {owner_user_account, column_name: table_name, options } = props;

        let state = {
            json_obj: {},
            owner_user_account,
            table_name,
            options
        };

        for(let i in state){
            this.state[i] = state[i];
        }

    }
    
    Input_Data_Types = {
        "string" : ({data_name})=>{
            
            let onChange = (e) => { 
                
                value = e.target.value;
                
                let {json_obj} = this.state;

                json_obj[data_name] = value;

                json_obj = JSON.parse(JSON.stringify(json_obj));

                this.setState({json_obj});  
                
            };
            
            return <div className="input-data-type string">
            
                <input type="text" onChange={onChange} />
            
            </div>;
        },
        "date" : ({data_name})=>{
            
            const {Calendar} = this.context;
            
            let onChange = ({selected_year, selected_month, date}) => {
                
                let value = `${selected_year}-${selected_month}-${date}`;

                let {json_obj} = this.state;

                json_obj[data_name] = value;

                json_obj = JSON.parse(JSON.stringify(json_obj));
                
                this.setState({json_obj});    
                
            };
            
            let {json_obj} = this.state;
            
            return <div className="input-data-type date">
            
                <div id="selected-date">
                    
                    {json_obj[data_name] || "Select a date"}
                    
                </div>
                
                <div id="dropdown">
                
                    <Calendar capture_date={onChange} />
                    
                </div>
                
            </div>;
        },
        "enum" : ({data_name, choices})=>{

            let select = (value)=>{

                let {json_obj} = this.state;

                json_obj[data_name] = value;

                json_obj = JSON.parse(JSON.stringify(json_obj));

                this.setState({json_obj});  

            }

            let {json_obj} = this.state;

            return <div className="input-data-type enum">

                <div id="selected-value">{json_obj[data_name] || "Select a value"}</div>

                <div id="dropdown">

                    <div id="selections">

                        {choices.map((value, index)=>{

                            let current_value = json_obj[data_name];

                            return current_value === value ? "" : 
                                <div className="option" key={value} onClick={(e)=>{
                                    select(value);
                                }}>

                                    {value}

                                </div>;

                        })}

                    </div>

                </div>

            </div>;
        }
    }   
    
    Add_New_Item = async ()=>{
        
        let {json_obj, owner_user_account, table_name} = this.state;

        json_obj.user_id = owner_user_account.id;
       
        let {add_item_to_profile_data} = this.context;

        let body = {
            to_insert: json_obj,
            table_name
        };

        await fetch(
            add_item_to_profile_data,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );
    }
    
    componentDidUpdate(prevProps, prevState){
        
        super.componentDidUpdate(prevProps, prevState);
    }
    
    Editor = ()=>{

        let { options } = this.state;

        return <div id="json-type-editor">
        
            <div id="input-wrapper">
                
                {options.map((item, index)=>{
                    
                    let {label, data_type, data_name, choices} = item;
                    
                    return <div className="input-item" key={index}>

                        <div id="label">
                            {label}
                        </div>
                        
                        <div id="value">

                            {this.Input_Data_Types[data_type]({data_name, choices})}

                        </div>

                    </div>;
                    
                })}
                
            </div>
            
            <div id="buttons-wrapper">
            
                <div id="the-add-button" onClick={(e)=>{ this.Add_New_Item(); }}>
                    Add
                </div>
                
            </div>

        </div>;
    }

    render() {

        return <div id="json-editor-wrapper">

            <div id="contents">

                {super.render()}

            </div>

        </div>;
    }
}

export default Json_Editor;