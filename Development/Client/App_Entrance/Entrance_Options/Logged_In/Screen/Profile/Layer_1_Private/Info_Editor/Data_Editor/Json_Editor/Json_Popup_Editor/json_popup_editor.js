import React, { Component } from 'react';
import New_Item from './New_Item/new_item.js';
import Date_Editor from '@date_editor';
import Choice_Editor from '@choice_editor';
import Text_Editor from '@text_editor';
import Json_Screen from '@json_screen';
import Request_URLs from '@request_urls';
import './json_popup_editor.less';

class Json_Popup_Editor extends Json_Screen {

    changes = {}; //This will be used to store the changes made by the user, which will be sent to the server when the user clicks the save button

    constructor(props) {

        super(props);
        

    }

    Input_Data_Types = {
        "string": ({data_name, label, value})=>{

            let onChange = ({column_name, value})=>{

                this.changes[column_name] = value;

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

                this.changes[column_name] = date_str;

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

                this.changes[column_name] = value;

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

        let {remove_item_from_profile_table} = Request_URLs;

        let {value, table_name} = this.state;

        await fetch(`${remove_item_from_profile_table}/${table_name}/${id}`,
            {
                method: "DELETE"
            }
        );

        value = value.filter((v)=>{v.id !== id; });

        this.setState({value});

        this.Retrieve_Data();
    }

    Add_New_Item = async ()=>{
        
        let {owner_user_account, table_name, value} = this.state;

        this.changes.user_id = owner_user_account.id;
       
        let {add_item_to_profile_table} = Request_URLs;

        let body = {
            to_insert: this.changes,
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

        value.push(this.changes);

        this.setState({value});

        this.changes = {}; //Reset the changes after adding a new item

        this.Retrieve_Data();
    }

    Update_Items = async ({id})=>{

        let {update_profile_table_data} = Request_URLs;
        let {table_name, value} = this.state;

        let body = {
            to_update: this.changes,
            id,
            table_name
        };

        await fetch(
            update_profile_table_data,
            {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    'content-type': "application/json"
                }
            }
        );

        //Update only the array element of value where element.id === id
        value = value.map((e, i)=>{

            if(e.id === id){
                for(let i in this.changes){
                    e[i] = this.changes[i];
                }
            }

            return e;
        });

        //Update value so that other array element will return to its original value
        this.setState({value});

        this.Retrieve_Data();
    }

    render() {

        return <div id="json-type-editor-wrapper">

            <div id="json-contents">

                {super.render()}

            </div>

        </div>;
    }
}

export default Json_Popup_Editor;