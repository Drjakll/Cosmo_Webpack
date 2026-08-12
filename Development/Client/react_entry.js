import React, { Component } from 'react';
import {createRoot} from 'react-dom/client';
import Context from './Context/context.js';
import App_Entrance from './App_Entrance/app_entrance.js';
import './react_entry.less';

class Entry extends Component {

    constructor(props){
        super(props);
    }
    
    async componentDidMount(){

    } 
    
    render(){
        
        window.Context = Context;
        
        let comp = <Context.Provider 
        
            value={{
            }}
        >
            
            <App_Entrance />
            
        </Context.Provider>;
            
        return comp;
    }
    
}


const root = createRoot(document.getElementById("root"));
root.render(<Entry/>);



