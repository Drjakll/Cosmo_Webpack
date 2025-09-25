import React, {Component} from 'react';
import './find_new.less';

class Find_New extends Component {
    
    constructor(props){
        
        super(props);

        let {account_data} = this.props;

        Find_New.contextType = window.Context;

        this.state = {
            account_data: account_data,
            search_results: []
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props.account_data === prevProps.account_data){
            return;
        }

        this.setState(this.props);
    }

    Apply_Search = async (requirements)=>{    

        let { find_connections } = this.context.Request_URLs;

        let result = await( await fetch(find_connections, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({requirements})
        })).json();

        if(result){
            
            this.setState({
                search_results: result.result
            });
        }
    }

    Generate_Connection_Options = (connection_profile, from, array_index = null)=>{

        let Send_Connection_Request = async (e)=>{

            let { connection_request } = this.context.Request_URLs;

            let {account_data} = this.state;

            let body = {
                request_from: account_data,
                request_to: connection_profile
            };

            let data = await (await fetch(connection_request, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })).json();

            if(data){
                //Update the particular search_results of array_index to reflect the sent connection_request
                let {updated_request_list} = data;

                let {search_results} = this.state;

                if(array_index !== null){
                    search_results[array_index].connection_requests = JSON.stringify(updated_request_list);
                }

                this.setState({search_results});
            }

            con_socket?.emit("refresh_account", {request_to_email: connection_profile.email});
        };

        let {account_data} = this.state;

        let connection_requests = JSON.parse(connection_profile.connection_requests || "{}");

        return <div id="connection-options">

            <button className="connection-option-button" onClick={Send_Connection_Request}>{connection_requests[account_data.email] ? "Cancel Request" : "Add"}</button>

            <button className="connection-option-button">Block</button>
            
        </div>;
    }

    //To determine if the result should not appear on the search page
    Do_Not_Appear = (oppose_user_acc)=>{

        let {id, block_list, connection_list} = oppose_user_acc;
        let {account_data} = this.state;

        id = parseInt(id);
        block_list = JSON.parse(block_list || "{}");
        connection_list = JSON.parse(connection_list || "{}");

        //The three conditions that stops search results to appear
        if(parseInt(account_data.id) === id || block_list[account_data.email] || connection_list[account_data.email]){
            return true;
        }

        return false;

    }
    
    render(){

        const {Profile_Thumbnail} = this.props;

        let {search_results} = this.state;
        
        return (
            <div id="connections-find-new-wrapper">

                <div id="result-label-wrapper">
                    
                    <label id="result-label">Search Results</label>

                </div>

                <div id="search-results-list-wrapper">

                    {search_results.map((data, index)=>{

                        return this.Do_Not_Appear(data) ?
                        
                        "" : 

                        <div className="thumbnail-wrapper" key={data.id}>

                            <Profile_Thumbnail connection_profile={data} current_user_account_data={this.state.account_data} generate_options={this.Generate_Connection_Options} array_index={index}/>

                        </div>;


                    })}

                </div>

            </div>
        );
    }
}

export default Find_New;