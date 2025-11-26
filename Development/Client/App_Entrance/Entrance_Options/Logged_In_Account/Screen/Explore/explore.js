import React, {Component} from 'react';
import './explore.less';

class Explore extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            owner_user_account: this.props.owner_user_account
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

                    <Explore_Template owner_user_account={this.state.owner_user_account} />
                    
                </div>
            );
    }
}

export default Explore;