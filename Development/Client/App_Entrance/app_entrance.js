import React, {Component} from 'react';
import './app_entrance.less';


class App_Entrance extends Component {
    
    constructor(props){
        
        super(props);
        
        App_Entrance.contextType = window.Context;
    }
    
    componentDidMount(){
        
    }
    
    render(){
        
        const {Logo} = this.context;
        
        return (
                <div id="app-entrance">

                    <div id="app">
                    
                        <Logo sizeScale={2.5}/>
                        
                    </div>
                    
                </div>
            );
    }
}

export default App_Entrance;