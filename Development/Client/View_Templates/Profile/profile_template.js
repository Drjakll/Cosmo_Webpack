import React, {Component} from 'react';
import Albums from './Components/Album/albums.js';
import Posts from './Components/Posts/posts.js';
import Profile_Info from './Components/Profile_Info/profile_info.js';
import Connections from './Components/Connections/connections_template.js';
import './profile_template.less';

class Profile_Template extends Component {
    
    
    
    constructor(props){
        
        super(props);
        
        Profile_Template.contextType = window.Context;
        
        this.state = {
            components: {
                "Profile Info": {component: Profile_Info, props: {}, classname: "profile-info-wrapper"},
                "Albums": {component: Albums, props: {}, classname: "albums-wrapper"}, 
                "Posts": {component: Posts, props: {}, classname: "posts-wrapper"},
                "Connections": {component: Connections, props: {}, classname: "connections-wrapper"},
            }
        };
    }
    
    componentDidMount(){
        if (this.props.account_data) {
            this.UpdateAllComponentProps({ account_data: this.props.account_data, connection_list: this.props.connection_list });
        }
        else if (this.props.get_account_data) {
            this.props.get_account_data(this.UpdateAllComponentProps);
        }
        
        
        if(this.props.add_editors){
            
            let {add_editors} = this.props;
            
            for(let key in add_editors){
                
                this.UpdateComponentProps(key, add_editors[key]);
            }
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        if(!this.props.account_data){
            return;
        }
        
        this.UpdateAllComponentProps({account_data: this.props.account_data, connection_list: this.props.connection_list});
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
        
        let { components } = this.state;
        
        return (
            <div id="profile-template">

                <div id="profile-template-components-wrapper">

                    {Object.keys(components).map((key, index) => {

                        const com = components[key];

                        const Com = com.component;

                        return <div className={`profile-template-component ${com.classname}`} key={key}>

                            <Com properties={com.props} />

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Profile_Template;