import React from 'react';
import Json_Text from '@json_text';
import Request_URLs from '@request_urls';
import './json_text_editor.less';


class Json_Text_Screen_Editor extends Json_Text {


    constructor(props){

        super(props);

    }

    componentDidMount(){

        this.setState({
            item_key: "",
            item_value: ""
        })
    }

    Edit_Key = (item_key)=>{

        this.setState({
            item_key
        });
    }

    Edit_Value = (item_value) =>{

        this.setState({
            item_value
        });
    }

    Add_Item = ()=>{

        let {item_value, item_key, value} = this.state;

        if(!value){
            return;
        }

        value[item_key] = item_value;

        this.setState({
            value
        });
        
    }

    Save_Traits = async ()=>{

        let {value, owner_user_account, column_name} = this.state;

        let {update_profile} = Request_URLs;

        let {id, password} = owner_user_account;

        let json_str = JSON.stringify(value);

        let to_update = {};

        to_update[column_name] = json_str;

        let credentials = {id, password };

        let body = {
            to_update,
            credentials
        };

        let result = await(await fetch(update_profile, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();

        if(!result){

            alert("Update trait failed!");
        }

    }

    Delete_Button = (key)=>{

        let erase = (e)=>{

            let {value} = this.state;

            delete value[key];

            this.setState({value});
        };

        return <div id="erase-trait-button" onClick={erase} key={key}>

            x

        </div>


    }

    render(){

        return <div id="json-text-screen-editor-wrapper"> 

                <div id="the-add-item-wrapper">

                    <div id="the-item-wrapper">

                        <div id="trait-name">

                            <label>Name</label>

                            <input type="text" onChange={(e)=>{ this.Edit_Key(e.target.value); }} maxLength={25} placeholder="Trait Name" />

                        </div>

                        <div id="trait-value">

                            <label>Value</label>

                            <input type="text" onChange={(e)=>{ this.Edit_Value(e.target.value); }} maxLength={25} placeholder="Trait Value" />
                            
                        </div>

                    </div>

                    <div id="the-buttons-wrapper">

                        <button onClick={this.Add_Item}>Add a Trait</button>

                        <button onClick={this.Save_Traits}>Save</button>

                    </div>

                </div>

                <div id="the-parent-contents">

                    {super.render()}

                </div>

            </div>;
    }
}

export default Json_Text_Screen_Editor;