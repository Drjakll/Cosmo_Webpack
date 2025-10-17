import React, {Component, createRef} from 'react';
import './profile_info_data.less';

class Profile_Info_Data extends Component {

    constructor(props) {

        super(props);

        Profile_Info_Data.contextType = window.Context;

        this.state = {
            account_data: this.props.accound_data,
            info_templates: {}
        };
    }

    async componentDidMount(){

        //Account_Info_Data_Template is located at the Data_Templates folder
        let {Account_Info_Data_Template} = this.context.Account_Data_Templates;

        let info_template = await Account_Info_Data_Template(null);

        this.state.info_templates = info_template;

        this.Update_Info_Templates();

        this.Attach_Editors();

        this.setState(this.state);
        
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
        
        let { account_data, refresh_account_data } = this.props;
        
        return (
            <div id="profile-info-data">

                <div id="profile-data-label-wrapper">

                    <label>
                        <u>Personal Information </u>
                    </label>

                </div>

                {/*this is just a gap for decoration*/}
                <div id="gap">

                    <div id="left"></div>

                    <div id="right">


                    </div>

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
                        let options = template.options;

                        return <div className="individual-info-wrapper" key={index}>

                            <div id="info-label">

                                {label}

                            </div>

                            <div id="info-value">

                                <Com variable_name={key}
                                    value={value}
                                    label={label}
                                    editor={editor}
                                    account_data={account_data}
                                    refresh_account_data={refresh_account_data}
                                    options={options}
                                />

                            </div>

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Profile_Info_Data;