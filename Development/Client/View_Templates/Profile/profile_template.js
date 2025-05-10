import React, {Component} from 'react';
import Albums from './Components/Album/albums.js';
import Posts from './Components/Posts/posts.js';
import Profile_Info from './Components/Profile_Info/profile_info.js';
import './profile_template.less';

class Profile_Template extends Component {
    
    state = {
        components: [
            {component: Profile_Info, props: {}, classname: "profile-info-wrapper"},
            {component: Albums, props: {}, classname: "albums-wrapper"}, 
            {component: Posts, props: {}, classname: "posts-wrapper"}
        ]
    };
    
    constructor(props){
        
        super(props);
        
        Profile_Template.contextType = window.Context;
    }
    
    componentDidMount(){
        
        if(this.props.get_account_data){
            this.props.get_account_data(this.UpdateAllComponentProps);
        }

    }
    
    UpdateComponentProps = (index, newProps) => {
        
        for(let i in newProps){
            
            this.state.components[index].props[i] = newProps[i];
            
        }
        
        
        this.setState({components: this.state.components});
        
    }
    
    UpdateAllComponentProps = (newProps) => {
        
        for(let h in this.state.components){
            
            for(let i in newProps){
            
                this.state.components[h].props[i] = newProps[i];
                
            }
        }
        
        
        this.setState({components: this.state.components});
    }
    
    render(){
        
        return (
                <div id="profile-template">
                    
                    <div id="profile-template-components-wrapper">
                    
                        {this.state.components.map((com, index)=>{
                            
                            const Com = com.component;
                            
                            return <div className={`profile-template-component ${com.classname}`} key={index}>
                                
                                <Com properties={com.props} />
            
                            </div>;
                            
                        })}
                    
                    </div>
                    
                </div>
            );
    }
}

export default Profile_Template;