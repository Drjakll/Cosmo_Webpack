import React, { Component } from 'react';
import Context from '@context/context.js';
import New_Item from './New_Item/new_item.js';
import Date_Editor from '@profile_data_editors/Date_Editor/date_editor.js';
import Choice_Editor from '@profile_data_editors/Choice_Editor/choice_editor.js';
import Text_Editor from '@profile_data_editors/Text_Editor/text_editor.js';
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
    
    componentDidUpdate(prevProps, prevState){
        
        super.componentDidUpdate(prevProps, prevState);
        
    }

    Input_Data_Types = {
        "string": ({data_name, label, value})=>{

            let onChange = ({column_name, value})=>{

                let {json_obj} = this.state;

                json_obj[column_name] = value;

                this.setState({json_obj});
            };

            let {owner_user_account} = this.state;

            return <Text_Editor 
                        value={value} 
                        owner_user_account={owner_user_account} 
                        column_name={data_name} 
                        label={label} 
                        update_callback={onChange}
                    />

        },
        "date": ({data_name, label, value}) => {

            let onChange = ({column_name, value})=>{

                let [selected_year, selected_month, date] = value.split("T")[0].split("-");

                let date_str = `${selected_year}-${selected_month}-${date}`;

                let {json_obj} = this.state;

                json_obj[column_name] = date_str;

                this.setState({json_obj});

            };

            let {owner_user_account} = this.state;

            return <Date_Editor
                        value={value} 
                        owner_user_account={owner_user_account} 
                        column_name={data_name} 
                        label={label} 
                        update_callback={onChange}
                    />

        },
        "enum": ({data_name, label, choices, value}) => {

            let onChange = ({column_name, value})=>{

                let {json_obj} = this.state;

                json_obj[column_name] = value;

                this.setState({json_obj});  
            };

            let {owner_user_account} = this.state;

            return <Choice_Editor 
                        value={value} 
                        owner_user_account={owner_user_account} 
                        column_name={data_name} 
                        label={label} 
                        options={choices} 
                        update_callback={onChange}
                    />
        }
    }
    
    Editor = ()=>{

        let { options, owner_user_account, table_name } = this.state;

        return <New_Item options={options} 
                        owner_user_account={owner_user_account} 
                        table_name={table_name} 
                        input_data_types={this.Input_Data_Types} 
                        add_new_item={this.Add_New_Item}/>
    }

    Delete_Item = async ({id})=>{

        let {remove_item_from_profile_table} = this.context.Request_URLs;

        let {value, table_name} = this.state;

        let body = {
            table_name,
            remove_req: {id}
        };

        await fetch(remove_item_from_profile_table,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );

        value = value.filter((v)=>{v.id !== id; });

        this.setState({value});

        window.Refresh_Login();
    }

    Add_New_Item = async ()=>{
        
        let {json_obj, owner_user_account, table_name, value} = this.state;

        json_obj.user_id = owner_user_account.id;
       
        let {add_item_to_profile_table} = this.context.Request_URLs;

        let body = {
            to_insert: json_obj,
            table_name
        };

        await fetch(
            add_item_to_profile_table,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );

        value.push(json_obj);

        this.setState({value, json_obj});

        json_obj = {};

        window.Refresh_Login();
    }

    Update_Items = async ({id})=>{

        let {update_profile_table_data} = this.context.Request_URLs;
        let {table_name, json_obj, value} = this.state;

        let body = {
            to_update: json_obj,
            id,
            table_name
        };

        await fetch(
            update_profile_table_data,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'content-type': "application/json"
                }
            }
        );

        //Update only the array element of value where element.id === id
        value = value.map((e, i)=>{

            if(e.id === id){
                for(let i in json_obj){
                    e[i] = json_obj[i];
                }
            }

            return e;
        });

        //Update value so that other array element will return to its original value
        this.setState({json_obj: {}, value});

        window.Refresh_Login();
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