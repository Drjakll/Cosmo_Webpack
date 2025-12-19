import React, {Component} from 'react';
import './json_type.less';

class Json_Type extends Component {

    
    constructor(props){
        
        super(props);

        Json_Type.contextType = window.Context;

        this.state = {
            label: this.props.label,
            value: this.props.value
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }

    Update_Account_Data = async (value) => {

        let { owner_user_account, variable_name } = this.state;
        let { Request_URLs, Cookie_Tools, Configurations } = this.context;
        let { update_profile } = Request_URLs;
        const { cookie_converter } = Cookie_Tools;

        owner_user_account[variable_name] = value;

        let res = await fetch(update_profile, {
            method: "POST",
            body: JSON.stringify(owner_user_account),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { refresh_account_data } = this.props;

        refresh_account_data();

    }

    Delete_Item = async (index) => {

        let array = JSON.parse(this.state.value);

        array.splice(index, 1);
        
        let json_string = JSON.stringify(array);

        await this.setState({ value: json_string });

        this.Update_Account_Data(json_string);

    }

    Contents = () => { 
        
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
        
        //The items below are for the editor

        let {Editor, owner_user_account, refresh_account_data, options, variable_name} = this.props;
        //End of the item list

        return <div id="json-type-contents">

            <div id="json-info-details">

                <div id="json-data-label">
                    {this.state.label}
                </div>

                {Editor ? <div id="add-content-editor-wrapper">

                    <Editor owner_user_account={owner_user_account}
                        refresh_account_data={refresh_account_data}
                        data_config={options}
                        variable_name={variable_name}
                        update_account_data={this.Update_Account_Data}
                        value={array_data}
                    />

                </div> : <></>}

                <div id="details">

                    {array_data?.map((json_obj, index_0) => {

                        return <div className="detail-wrapper" key={index_0}>

                            <div id="detail-index">

                                {index_0 + 1}

                            </div>

                            <div id="detail-segments-wrapper">

                                {Object.keys(json_obj).map((key, index_1) => {

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

                            {Editor ? <div id="delete-button-wrapper">
                                <div id="delete-button" onClick={(e) => { this.Delete_Item(index_0); }}>
                                    Delete
                                </div>
                            </div> : <></>}

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