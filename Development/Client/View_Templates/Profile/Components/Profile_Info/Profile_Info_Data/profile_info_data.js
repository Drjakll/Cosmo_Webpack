import React, {Component, createRef} from 'react';
import Choice_Type from './Info_Types/Choice_Type/choice_type.js';
import Date_Type from './Info_Types/Date_Type/date_type.js';
import Json_Type from './Info_Types/Json_Type/json_type.js';
import Text_Type from './Info_Types/Text_Type/text_type.js';
import './profile_info_data.less';

class Profile_Info_Data extends Component {

    constructor(props) {

        super(props);

        Profile_Info_Data.contextType = window.Context;

        this.state = {
            account_data: this.props.accound_data,
            info_templates: {
                first_name: { component: Text_Type, label: "First Name", value: "", editor: null },
                last_name: { component: Text_Type, label: "Last Name", value: "", editor: null },
                date_of_birth: { component: Date_Type, label: "Birth Date", value: "", editor: null },
                birth_location: { component: Json_Type, label: "Birthplace", value: "", editor: null },
                gender: { component: Choice_Type, label: "Gender", value: "", editor: null },
                current_location: { component: Json_Type, label: "Current Location", value: "", editor: null },
                martial_status: { component: Choice_Type, label: "Martial Status", value: "", editor: null },
                hobbies: { component: Json_Type, label: "Hobbies", value: "", editor: null },
                professions: { component: Json_Type, label: "Professions", value: "", editor: null },
                schools: { component: Json_Type, label: "School", value: "", editor: null }
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        for (let i in this.props) {

            this.state[i] = this.props[i];

        }

        this.Update_Info_Templates();

        this.Attach_Editors();

        this.setState(this.state);

    }

    Update_Info_Templates = () => {

        for (let i in this.state.account_data) {

            if (!this.state.info_templates[i]) {
                continue;
            }

            this.state.info_templates[i].value = this.state.account_data[i];
        }
    }

    Attach_Editors = () => {

        const { generate_editors } = this.props;

        if (!generate_editors) {
            return;
        }

        let editors = generate_editors();

        for (let i in editors) { 

            if (!this.state.info_templates[i]) {
                continue;
            }

            this.state.info_templates[i].editor = editors[i];

        }

    }
    
    render(){
        
        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();
        
        let infoWrapperRef = createRef();
        
        return (
            <div id="profile-info-data">

                <div id="profile-data-label-wrapper">

                    <label>
                        Account Details
                    </label>

                </div>

                <div id="info-wrapper"
                    ref={infoWrapperRef}
                    onMouseDown={(e) => {
                        drag_scroll.init_drag(e, infoWrapperRef.current);
                    }}

                    onMouseLeave={(e) => {
                        drag_scroll.disable_drag(e, infoWrapperRef.current);
                    }}

                    onMouseUp={(e) => {
                        drag_scroll.disable_drag(e, infoWrapperRef.current);
                    }}
                    onMouseMove={(e) => {
                        drag_scroll.move_drag(e, infoWrapperRef.current);
                    }}
                    tabIndex="0"
                >

                    {Object.keys(this.state.info_templates).map((key, index) => {

                        const template = this.state.info_templates[key];

                        const Com = template.component;
                        let value = template.value;
                        const label = template.label;
                        let editor = template.editor;

                        return <div className="individual-info-wrapper" key={index}>

                            <div id="info-label">

                                {label}

                            </div>

                            <div id="info-value">

                                <Com value={value} label={label} editor={editor} />

                            </div>

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Profile_Info_Data;