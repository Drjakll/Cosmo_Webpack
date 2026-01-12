import React , {Component} from 'react';
import Context from '@context/context.js';
import Connection_List_Template from '@profile_template/Components/Connections/Connection_List_Template/connection_list_template.js';
import './search.less';

class Search extends Connection_List_Template {

    static contextType = Context
    
    constructor(props){
        
        super(props);

        

    }
    
    render(){
        
        return (
            <div id="search-wrapper">


            </div>
        );
    }
}

export default Search;