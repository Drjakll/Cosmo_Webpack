import React, {Component} from 'react';
import './json_type.less';

class Json_Type extends Component {

    
    constructor(props){
        
        super(props);

        Json_Type.contextType = window.Context;

        this.state = {
            label: this.props.label,
            value: this.props.value,
            show_popup: false
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        for(let i in this.props){
            
            this.state[i] = this.props[i];
            
        }
        
        this.setState(this.state);
    }

    Update_Account_Data = async (value) => {

        let { account_data, variable_name } = this.state;
        let { Request_URLs, Cookie_Tools, Configurations } = this.context;
        let { update_profile } = Request_URLs;
        const { cookie_converter } = Cookie_Tools;

        account_data[variable_name] = value;

        let body = account_data;

        let res = await fetch(update_profile, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let resJson = await res.json();

        if (resJson) {

            let date = new Date();

            date.setTime(date.getTime() + Configurations.Cookie_Expire_Days * 24 * 60 * 60 * 1000);

            let cookieStrs = cookie_converter(account_data, { "expires": date.toUTCString(), "path": "/" });

            for (let cookieStr of cookieStrs) {
                document.cookie = cookieStr;
            }

            const { refresh_account_data } = this.props;

            refresh_account_data();
        }

    }

    Delete_Item = async (index) => {

        let array = JSON.parse(this.state.value);

        array.splice(index, 1);
        
        let json_string = JSON.stringify(array);

        await this.setState({ value: json_string });

        this.Update_Account_Data(json_string);

    }

    Pop_Up = () => { 
        
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
        let Editor = this.props.editor;
        let account_data = this.props.account_data;
        let refresh_account_data = this.props.refresh_account_data;
        let options = this.props.options;
        let variable_name = this.props.variable_name;
        //End of the item list

        return <div id="json-type-popup">

            <div id="json-info-details">

                <div id="json-data-label">
                    {this.state.label}
                </div>

                {Editor ? <div id="add-content-editor-wrapper">

                    <Editor account_data={account_data}
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

            <div id="popup-wrapper" onClick={(e) => { this.setState({ show_popup: false }); }}>


            </div>

        </div>;
    }
    
    render(){
        
        return (
            <div id="json-type" className={`info ${this.state.show_popup ? 'popped': ''}`}>
                
                {this.state.show_popup ? this.Pop_Up() : <></>}
                    
                <div id="value-wrapper">
                    
                    <div id="show-button" onClick={(e)=>{this.setState({show_popup: true}); }}>
                            
                        Show
                            
                    </div>
                
                </div>
                    
            </div>
        );
    }
}

export default Json_Type;