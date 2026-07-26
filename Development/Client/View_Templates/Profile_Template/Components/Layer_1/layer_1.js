import React, {Component} from 'react';
import Profile_Info from './Profile_Info/profile_info.js';
import Connections from './Connections/connections.js';
import './layer_1.less';

class Layer_1 extends Component {

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account, change_display} = props;

        this.General_Props = {
            owner_user_account,
            visitor_user_account,
            change_display
        };

        this.Render_List = {
            "Profile_Info": {
                component: Profile_Info,
                props: {},
                classname: "layer_1-profile-info-wrapper"
            },
            "Connections": {
                component: Connections,
                props: {},
                classname: "layer_1-connections-wrapper"
            },
        };

        this.state = {
            owner_user_account,
            visitor_user_account,
            general_props: this.General_Props,
            render_list: this.Render_List
        };

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {owner_user_account, visitor_user_account, change_display} = this.props;

        this.General_Props = {owner_user_account, visitor_user_account, change_display}

        this.setState({
            owner_user_account,
            visitor_user_account,
            general_props: this.General_Props
        });
    }

    render(){

        let {render_list, general_props} = this.state;

        return <div id="layer_1-wrapper">

            {Object.keys(render_list).map((name, index)=>{

                let {component: Com, props, classname} = render_list[name];

                return <div className={`layer_1-component-wrapper ${classname}`} key={index}>

                    <Com {...general_props} {...props} />

                </div>

            })}
            
        </div>;
    }
}

export default Layer_1;