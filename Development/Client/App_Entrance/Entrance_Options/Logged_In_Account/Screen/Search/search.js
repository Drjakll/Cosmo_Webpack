import React , {Component, createRef} from 'react';
import Context from '@context/context.js';
import Connection_List_Template from '@profile_template/Components/Connections/Connection_List_Template/connection_list_template.js';
import Criteria_Box from '@universal_components/Search_Criteria_Box/search_criteria_box.js';
import './search.less';

class Search extends Connection_List_Template {

    static contextType = Context

    search_crit_ref = createRef();
    search_res_ref = createRef();
    
    constructor(props){
        
        super(props);
        
    }

    Apply_Search = async (search_criteria)=>{

        let {find_connections} = this.context.Request_URLs;
        let {owner_user_account} = this.state;

        let body = {
            requirements: search_criteria,
            self_account: owner_user_account
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

                <div id="search-criteria-box-wrapper" 
                    className="crit-not-focusing"
                    ref={this.search_crit_ref}
                    onClick={(e)=>{ 
                        this.search_crit_ref.current.className = "crit-focusing"; 
                        this.search_res_ref.current.className = "res-not-focusing";
                     }}
                >
                
                    <Criteria_Box Execute_Search={this.Apply_Search}/>

                </div>

                <div id="search-results-wrapper"
                    className="res-focusing"
                    ref={this.search_res_ref}
                    onClick={(e)=>{ 
                        this.search_crit_ref.current.className = "crit-not-focusing";
                        this.search_res_ref.current.className = "res-focusing";
                     }}
                >

                    {super.render()}

                </div>

            </div>
        );
    }
}

export default Search;