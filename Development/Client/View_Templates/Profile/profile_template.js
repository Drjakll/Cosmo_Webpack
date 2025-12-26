import React, {Component} from 'react';
import Albums from './Components/Album/albums.js';
import Posts from './Components/Posts/posts.js';
import {Profile_Info, Profile_Picture, Profile_Info_Data} from './Components/Profile_Info/profile_info.js';
import Connections from './Components/Connections/connections.js';
import Context from '@context/context.js';
import './profile_template.less';

class Profile_Template extends Component {
    
    last_render_callback = [];
    
    constructor(props){

        super(props);
        
        Profile_Template.contextType = Context;

        let {owner_user_account, visitor_user_account} = this.props;

        
        this.state = {
            owner_user_account,
            visitor_user_account,
            render_callback: this.Display_Main_Components,
            general_props: { //This props will be passed to all components
                owner_user_account, 
                visitor_user_account, 
                change_display: this.Change_Display,
                return_previous_display: this.Return_Previous_Display
            },
            components: {
                "Profile Info": {
                    component: this.Generate_Profile_Info, 
                    props: {}, 
                    classname: "profile-info-wrapper"
                },
                "Connections": {
                    component: this.Generate_Connections, 
                    props: {}, 
                    classname: "connections-wrapper"
                },
                "Albums": {
                    component: this.Generate_Albums, 
                    props: {}, 
                    classname: "albums-wrapper"
                }, 
                "Posts": {component: this.Generate_Posts, 
                    props: {}, 
                    classname: "posts-wrapper"
                }
            }
        };
    }
    
    componentDidMount(){

        if (this.props.owner_user_account) {

            this.UpdateAllComponentProps({
                visitor_user_account: this.props.visitor_user_account || {},
                owner_user_account: this.props.owner_user_account || {}, 
                connection_list: this.props.connection_list || {} 
            });

        }

    }

    //This may be override by child class
    Generate_Profile_Info = (general_props, unique_props)=>{

        return <Profile_Info {...general_props} {...unique_props} />;
    }

    //This may be override by child class    
    Generate_Connections = (general_props, unique_props)=>{
        
        return "";
        return <Connections {...general_props} {...unique_props} />;
    }   

    //This may be override by child class    
    Generate_Albums = (general_props, unique_props)=>{    

        return ""
        return <Albums {...general_props} {...unique_props} />;
    }

    //This may be override by child class
    Generate_Posts = (general_props, unique_props)=>{

        return ""
        return <Posts {...general_props} {...unique_props}/>;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        if(!this.props.owner_user_account){
            return;
        }
        
        this.UpdateAllComponentProps({
            visitor_user_account: this.props.visitor_user_account || {},
            owner_user_account: this.props.owner_user_account || {},
            connection_list: this.props.connection_list || {}
        });
    }
    
    UpdateComponentProps = (index, newProps) => {
        
        for(let i in newProps){
            
            this.state.components[index].props[i] = newProps[i];
            
        }
        
        this.setState({components: this.state.components});
        
    }
    
    UpdateAllComponentProps = (newProps) => {

        let {general_props} = this.state;

        for(let i in newProps){
            
            general_props[i] = newProps[i];

        }

        this.setState({general_props});

    }

    Display_Main_Components = () => {

        let { components, general_props } = this.state;

        return <div id="profile-template-components-wrapper">

            {Object.keys(components).map((key, index) => {

                const com = components[key];

                const Com_Render = com.component;

                const unique_props = com.props;

                return <div className={`profile-template-component ${com.classname}`} key={key}>

                    {Com_Render(general_props, unique_props)}

                </div>;

            })}

        </div>
    }

    Change_Display = (render_callback) => {

        this.last_render_callback.push(this.state.render_callback);

        this.setState({render_callback});

    }

    Return_Previous_Display = () => {

        if(this.last_render_callback.length === 0){
            return;
        }

        let previous_render_callback = this.last_render_callback.pop();

        this.setState({render_callback: previous_render_callback});

    }

    render(){
        
        let { render_callback } = this.state;
        
        return (
            <div id="profile-template">

                 {render_callback === this.Display_Main_Components ? 

                    render_callback() : 

                    <div id="content-with-back-button">

                        <div id="back-button" onClick={this.Return_Previous_Display}>
                            Back    
                        </div>

                        <div id="contents">
                            {render_callback()}
                        </div>

                    </div>
                }

            </div>
        );
    }
}

export {Profile_Template, Profile_Info, Profile_Picture, Profile_Info_Data, Albums, Posts, Connections};