import React, {Component} from 'react';
import Context from '@context/context.js';
import './json_screen.less';

class Json_Popup extends Component {

    static contextType = Context;

    Name_Map = {};
    
    //These will be replaced by the editor, which will inherit this
    Delete_Item = null

    Editor = null

    Input_Data_Types = null

    Update_Items = null


    constructor(props){

        super(props);

        let {label, table_name, owner_user_account, visitor_user_account, options} = props;

        this.Name_Mapping(options);

        this.state = {
            label,
            value: [],
            table_name,
            visitor_user_account,
            owner_user_account,
            options,
            popup: false,
            json_obj: {} //This will be used for adding item using the editor
        };
    }

    async componentDidMount(){

        this.Retrieve_Data();

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props !== prevProps){

            this.setState(this.props);

        }
    }

    Name_Mapping = (options)=>{

        for(let o of options){

            let {label, data_name, data_type, choices} = o;

            this.Name_Map[data_name] = {label, data_type, choices, data_name};
        }

    }    

    Add_Item_Popup = ()=>{

        return <div id="editor-popup">

            <div id="exit-popup" onClick={(e)=>{this.setState({popup: false}); }}></div>

            <div id="json-editor-wrapper">

                {this.Editor && this.Editor()}

            </div>

        </div>
    }


    Retrieve_Data = async ()=>{

        let {table_name} = this.state;

        let {id} = this.state.owner_user_account;

        let {get_user_table_data} = this.context.Request_URLs;

        let body ={
            user_id: id,
            table_name
        };

        let data = await(await fetch(
            get_user_table_data,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();


        this.setState({ value: data?.results ?? [] })

    }

    render(){

        let {value, label, visitor_user_account, owner_user_account, table_name, popup} = this.state;

        let {id: visitor_id} = visitor_user_account;
        let {id: owner_id} = owner_user_account;

        return <div id="json-type-contents">

            {this.Editor && <div id="add-button-wrapper">
                <div id="add-entry-button" onClick={(e)=>{this.setState({popup: true})}}>
                    Add
                </div>
            </div>}

            {popup && this.Add_Item_Popup()}

            <div id="json-info-details">

                <div id="json-data-label">
                    {label}
                </div>

                <div id="details">

                    {value?.map((table, index_0) => {

                        return <div className="detail-wrapper" key={index_0}>

                            <div id="detail-index">

                                {index_0 + 1}

                            </div>

                            <div id="detail-segments-wrapper">

                                {Object.keys(table).map((key, index_1) => {

                                    let {data_type, label, choices, data_name} = this.Name_Map[key] || {};

                                    return key === "id" ? "" : key === "privacy" && visitor_id !== owner_id ? "" : <div className="detail-segment" key={index_1}>

                                        <div id="detail-segment-label">

                                            {label}

                                        </div>

                                        <div id="detail-segment-value">

                                            {(this.Input_Data_Types[data_type] && this.Input_Data_Types[data_type]({value: table[key], data_name, choices}) ) || table[key]}

                                        </div>

                                    </div>;

                                })}

                            </div>

                            {this.Delete_Item !== null && this.Update_Items !== null ? 

                                <div id="buttons-wrapper">

                                    <div id="delete-button" className="button" onClick={(e) => { this.Delete_Item({id: table.id}); }}>
                                        Delete
                                    </div>

                                    <div id="save-button" className="button" onClick={(e) => { this.Update_Items({id: table.id}); }}>
                                        Save
                                    </div>

                                </div> 

                            : ""}

                        </div>;

                    })}

                </div>

            </div>

        </div>;
    }
}

export default Json_Popup;