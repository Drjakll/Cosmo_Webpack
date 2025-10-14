import React, {Component} from 'react';
import './find_new.less';

class Find_New extends Component {
    
    constructor(props){
        
        super(props);

        let {account_data, connection_list} = this.props;

        Find_New.contextType = window.Context;

        this.state = {
            account_data: account_data,
            connection_list: connection_list,
            pending_connection_requests: {},
            search_results: []
        };
    }

    async componentDidMount(){

        //Get all the pending requests
        await this.Get_Pending_Requests();
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

    Generate_Connection_Options = (connection_profile, array_index = null)=>{

        //send is a flag signal to remove or send
        let Signal_Connection_Request = async (send = false)=>{

            let { send_connection_request, remove_connection_request } = this.context.Request_URLs;

            let {account_data} = this.state;

            //Signal the request to connect, either remove or send connection request
            let body = {
                request_from: account_data,
                request_to: connection_profile
            };

            let data = await (await fetch(send ? send_connection_request : remove_connection_request, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })).json();

            //Update pending requests
            this.Get_Pending_Requests();

            //Signal the other party to refresh their connection requests
            global_connection_socket?.emit("refresh_alerts", {request_to_email: connection_profile.email});
        };

        let {pending_connection_requests} = this.state;

        return <div id="connection-options">

            <button className="connection-option-button" onClick={(e)=>{Signal_Connection_Request(pending_connection_requests[connection_profile.email] ? false : true); }}>
                {pending_connection_requests[connection_profile.email] ? "Cancel Request" : "Add"}
            </button>

            <button className="connection-option-button">Block</button>
            
        </div>;
    }

    //Find all pending requests
    Get_Pending_Requests = async ()=>{

        let {get_connection_requests_from } = this.context.Request_URLs;

        let {account_data} = this.state;

        let body = {
            request_from: account_data,
            status: "pending"
        };

        let data = await (await fetch(
                            get_connection_requests_from,
                                {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(body)
                                }
                            )).json();

        if(data){

            let {results} = data;

            let pending_requests = {};

            for(let entry of results){

                pending_requests[entry] = entry;

            }

            this.setState({pending_connection_requests: pending_requests});

        }
    }



    //To determine if the result should not appear on the search page
    Do_Not_Appear = (oppose_user_acc)=>{

        let {id, block_list} = oppose_user_acc;
        let {account_data, connection_list} = this.state;

        id = parseInt(id);
        block_list = JSON.parse(block_list || "{}");

        //The three conditions that stops search results to appear - Self, blocked, and if it's already in the connection list
        if(parseInt(account_data.id) === id || block_list[account_data.email] || connection_list[oppose_user_acc.email]){
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