import React, {Component} from 'react';
import Layer_1 from './Components/Layer_1/layer_1.js';
import Layer_2 from './Components/Layer_2/layer_2.js';
import Layer_3 from './Components/Layer_3/layer_3.js';
import './profile_template.less';

class Profile_Template extends Component {
    
    //To keep records of all the components that were rendered in a stack
    last_render_callback = [];
    
    constructor(props){

        super(props);
        

        let {owner_user_account, visitor_user_account} = this.props;


        this.General_Props = { //This props will be passed to all the components
            owner_user_account, 
            visitor_user_account,
            change_display: this.Change_Display
        };

        this.Render_List = {
            "Layer_1": {
                component: Layer_1, 
                props: {}, 
                classname: "layer_1-wrapper"
            },
            "Layer_3": {
                component: Layer_3, 
                props: {}, 
                classname: "layer_3-wrapper"
            },
            "Layer_2": {
                component: Layer_2, 
                props: {}, 
                classname: "layer_2-wrapper"
            }
        };

        this.state = {
            owner_user_account,
            visitor_user_account,
            render_list: this.Render_List,
            general_props: this.General_Props,
            render_callback: this.Display_Main_Components //The display that will be rendered
        };
    }
    
    componentDidMount(){


    }

    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        if(!this.props.owner_user_account){
            return;
        }

        let {visitor_user_account, owner_user_account} = this.props;

        this.General_Props = {owner_user_account, visitor_user_account, change_display: this.Change_Display}

        this.setState({owner_user_account, visitor_user_account, general_props: this.General_Props});
        
    }
    
    //Update individual unique props
    UpdateComponentProps = (index, newProps) => {

        let {render_list} = this.state;
        
        for(let i in newProps){
            
            render_list[index].props[i] = newProps[i];
            
        }
        
        this.setState({render_list});
        
    }
    
    UpdateAllComponentProps = (newProps) => {

        let {general_props} = this.state;

        for(let i in newProps){
            
            general_props[i] = newProps[i];

        }

        this.setState({general_props});

    }

    Display_Main_Components = () => {

        let {general_props, render_list} = this.state;

        return <div id="profile-template-components-wrapper">

            {Object.keys(render_list).map((key, index) => {

                const {component: Com_Render, props, classname} = render_list[key];

                return <div className={`profile-template-component ${classname}`} key={key}>

                    <Com_Render {...general_props}  {...props} /> 

                </div>;

            })}

        </div>
    }

    Change_Display = (render_callback) => {

        //Push the last display onto the stack
        this.last_render_callback.push(this.state.render_callback);

        //Set the current display
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
        
        let { render_callback, owner_user_account } = this.state;
        
        return (
            <div id="profile-template">

                 {render_callback === this.Display_Main_Components ? 

                    this.Display_Main_Components() : 

                    <div id="content-with-back-button">

                        <div id="back-button" onClick={this.Return_Previous_Display}>
                            Back    
                        </div>

                        <div id="contents">

                            {/* Pass owner_user_account to ensure updates for the other component, wherever render_callback is from */}
                            {render_callback({owner_user_account})} 
                            
                        </div>

                    </div>
                }

            </div>
        );
    }
}

export default Profile_Template;