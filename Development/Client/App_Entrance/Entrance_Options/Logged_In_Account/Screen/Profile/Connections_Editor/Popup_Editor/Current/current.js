import React, {Component} from 'react';
import './current.less';

class Current extends Component {
    
    constructor(props){
        
        super(props);

        Current.contextType = window.Context;

        let {account_data, connection_list} = this.props;

        this.state = {
            account_data: account_data,
            search_results: connection_list,
            all_connections: connection_list
        };
    }

    componentDidMount(){
        
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props.account_data === prevProps.account_data){
            return;
        }

        this.setState(this.props);
    }

    Apply_Search = async (requirements)=>{    

        let { find_connections } = this.context.Request_URLs;

        let {all_connections} = this.state;

        //"group_start" means it's the start of a parenthesis "("
        requirements["group_start"] = {type: "group_start"};

        for(let email in all_connections){
            requirements[email] = {key: "email", value: all_connections[email].email, type: "string", conjunc: "=", logical: "or"};
        }

        //"group_end" means it's the end of a parenthesis ")"
        requirements["group_end"] = {type: "group_end"};

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

        let Remove_Connection = async (e)=>{

            const {remove_connection_request} = this.context.Request_URLs;

            let {account_data} = this.state;

            let body = {
                request_from: account_data,
                request_to: connection_profile
            };

            await fetch(remove_connection_request, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(body)
            });

            //Let the opposing account know that the connection has been removed
            global_connection_socket?.emit("refresh_account", {request_to_email: connection_profile.email});

            delete this.state.all_connections[connection_profile.email];

            await this.setState({all_connections: this.state.all_connections});

            await this.Apply_Search({});

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

                    {Object.keys(search_results).map((key, index)=>{

                        let data = search_results[key];

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