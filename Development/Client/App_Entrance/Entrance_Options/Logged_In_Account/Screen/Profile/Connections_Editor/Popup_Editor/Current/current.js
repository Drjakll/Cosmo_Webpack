import React, {Component} from 'react';
import './current.less';

class Current extends Component {
    
    constructor(props){
        
        super(props);

        Current.contextType = window.Context;

        let {account_data} = this.props;

        this.state = {
            account_data: account_data,
            search_results: []
        };
    }

    componentDidMount(){
        
        this.Get_Connection_List();

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props.account_data === prevProps.account_data){
            return;
        }

        this.setState(this.props);
    }

    Get_Connection_List = async ()=>{

        let {account_data} = this.state;

        if(!account_data){
            return;
        }

        let {email} = account_data;

        let { get_all_connections } = this.context.Request_URLs;

        let data = await (await fetch(
            get_all_connections, {
                method: "POST",
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            let {result} = data;

            this.setState({search_results: result});

        }
    }

    Apply_Search = async (requirements)=>{    

        let { find_connections } = this.context.Request_URLs;

        let new_req = {};

        new_req[this.state.account_data.email] = true;

        requirements[this.state.account_data.email] = {key: "connection_list", value: new_req, type: "json", conjunc: "json_contains_path"};

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

        let Remove_Connection = async (e)=>{

            const {remove_connection} = this.context.Request_URLs;

            let {account_data} = this.state;

            let body = {
                email: account_data.email,
                to_remove_email: connection_profile.email
            };

            await fetch(remove_connection, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(body)
            });

            //Let the opposing account know that the connection has been removed
            con_socket?.emit("refresh_account", {request_to_email: connection_profile.email});

            await this.Get_Connection_List();

            window.LoginAttempt();

        };

        return <div id="connection-options">

            <button className="connection-option-button" onClick={Remove_Connection}>Remove</button>

            <button className="connection-option-button">Block</button>

        </div>
    }

    Do_Not_Appear = (account)=>{

        return false;
    }
    
    render(){

        const {Profile_Thumbnail} = this.props;

        let {search_results} = this.state;
        
        return (
            <div id="connections-current-wrapper">

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

export default Current;