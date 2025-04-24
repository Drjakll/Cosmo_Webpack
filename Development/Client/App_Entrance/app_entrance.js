import React, {Component} from 'react';
import './app_entrance.less';
import Entrance_Options from './Entrance_Options/entrance_options.js';


class App_Entrance extends Component {
    
    constructor(props){
        
        super(props);
        
        App_Entrance.contextType = window.Context;
    }
    
    componentDidMount(){
        
    }
    
    render(){
        
        let {Drag_Scroll} = this.context;
        
        return (
                <div id="app-entrance" onMouseMove={(e)=>{Drag_Scroll.update_pageXY(e);}}>
                    
                    <Entrance_Options/>
                    
                </div>
            );
    }
}

export default App_Entrance;