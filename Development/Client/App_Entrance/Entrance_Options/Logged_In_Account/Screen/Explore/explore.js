import React, {Component} from 'react';
import './explore.less';

class Explore extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            account_data: this.props.account_data
        };
        
        Explore.contextType = window.Context;

    }
    
    componentDidUpdate(prevProps, prevSate){

        if(this.props === prevProps){
            return;
        }
        
  
        this.setState(this.props);
    }
    
    render(){
        
        const {Explore_Template} = this.context;
        
        return (
                <div id="explore">

                    <Explore_Template account_data={this.state.account_data} />
                    
                </div>
            );
    }
}

export default Explore;