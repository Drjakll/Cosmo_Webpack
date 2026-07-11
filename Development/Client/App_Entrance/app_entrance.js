import React, {Component, createRef} from 'react';
import './app_entrance.less';
import Entrance_Options from './Entrance_Options/entrance_options.js';


class App_Entrance extends Component {

    entrance_ref = createRef();

    constructor(props){
        
        super(props);
        
        App_Entrance.contextType = window.Context;
    }
    
    componentDidMount(){
        let { Drag } = this.context;

        Drag.parent = this.entrance_ref.current;

    }
    
    render(){
        
        let { Drag_Scroll, Drag } = this.context;

        let drag = new Drag();
        
        return (
            <div id="app-entrance" className="" ref={this.entrance_ref}
                onMouseMove={(e) => { 
                    Drag_Scroll.update_pageXY && Drag_Scroll.update_pageXY(e); 
                    drag.dragging(e); 
                }}
                onMouseDown={(e) => { 
                    drag.init_drag(e);
                }}
            >
                    
                <Entrance_Options/>
                    
            </div>
        );
    }
}

export default App_Entrance;