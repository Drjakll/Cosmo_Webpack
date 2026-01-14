import React , {Component} from 'react';
import Context from '@context/context.js';
import Connection_List_Template from '@profile_template/Components/Connections/Connection_List_Template/connection_list_template.js';
import Criteria_Box from './Criteria_Box/criteria_box.js';
import './search.less';

class Search extends Connection_List_Template {

    static contextType = Context
    
    constructor(props){
        
        super(props);

    }

    Apply_Search = async (search_criteria)=>{

        let {find_connections} = this.context.Request_URLs;

        let body = {
            requirements: search_criteria
        };

        let data = await( await fetch(
            find_connections,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            this.setState({list: data.results});

        } else {

            alert("Error applying search");

        }

    }
    
    render(){
        
        return (
            <div id="search-wrapper">
                
                <Criteria_Box Execute_Search={this.Apply_Search}/>

                <div id="search-results-wrapper">

                    {super.render()}

                </div>

            </div>
        );
    }
}

export default Search;