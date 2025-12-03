import React, {Component} from 'react';
import Screen from './Screen/screen.js';
import Upper_Bar from './Upper_Bar/upper_bar.js';
import { io } from 'socket.io-client';
import './logged_in_account.less';


class Logged_In_Account extends Component {
    
    Button_Data = [
        "Livestream",
        "Profile",
        "News",
        "Messaging",
    ];

    //Fixed index of screens
    Columns = [
        { screen: "Livestream", is_main: false, id: "Livestream" },
        { screen: "Profile", is_main: false, id: "Profile" },
        { screen: "News", is_main: false, id: "News" },
        { screen: "Messaging", is_main: false, id: "Messaging"},
    ]
    
    constructor(props){
        
        super(props);

        window.global_connection_socket = io("/connections");

        Logged_In_Account.contextType = window.Context;

        this.state = {
            Columns: [ //This Columns will dynamically rearrange by the user
                { screen: "Livestream", is_main: false, id: "Livestream" },
                { screen: "Profile", is_main: true, id: "Profile" },
                { screen: "News", is_main: false, id: "News" },
                { screen: "Messaging", is_main: false, id: "Messaging" },
            ],
            owner_user_account: this.props.owner_user_account,
            connection_list: {},
            focused_column: "Profile" //The column that is being focused on so that user won't lose clickability to other columns
        };
    }

    async componentDidMount() {
    

        //Delete the user key from the websocket backend before exiting
        window.addEventListener("beforeunload", (e)=>{

            global_connection_socket.emit("logging_off", {email: this.state.owner_user_account.email});

        });

        global_connection_socket.on("connect", async ()=>{

            //Signal to create the user key at the websocket backend
            global_connection_socket.emit("newly_logged_in", {email: this.state.owner_user_account.email});

        });

        global_connection_socket.on("refresh_account", ({})=>{

            window.LoginAttempt();

        });

        global_connection_socket.on("refresh_connection_list", ({})=>{

            this.Get_Connection_List(this.state.owner_user_account);

        });


        await this.Get_Connection_List(this.state.owner_user_account);

        this.RotateScreen(1);

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        await this.Get_Connection_List(this.props.owner_user_account);

    }
    
    //This function is to change the main screen. Also changes the left and right screen.
    RotateScreen = async (index) => {

        let { Columns } = this.state;

        let length = this.Button_Data.length;

        for(let i in this.Columns){

            let newIndex = (((parseInt(i) + 1 - index)%length + length)%length);

            Columns[newIndex] = this.Columns[i];
            Columns[newIndex].is_main = false;

        }

        //So that the main menu will display at the middle screen, index = 1 
        Columns[1].is_main = true;


        await this.setState({
            Columns: Columns
        });

        document.querySelector(`#${this.Button_Data[index]}`).scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });

    }
    
    Get_Connection_List = async (owner_user_account)=>{

        if(!owner_user_account){
            return;
        }

        let { get_connection_list } = this.context.Request_URLs;

        let body = {
            request: owner_user_account,
            status: "accepted"
        };

        let data = await (await fetch(
            get_connection_list, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            let {results} = data;

            let jsonObj_results = {};

            for(let entry of results){
                jsonObj_results[entry.email] = entry;
            }

            await this.setState({owner_user_account, connection_list: jsonObj_results});

        }

    }

    render(){
        
        //This only shows in the middle screen
        let main_options = <div id="logged-in-option-buttons">

            {this.Button_Data.map((value, index) => {

                return <div className="logged-in-option-button"
                        key={index}
                        onClick={(e) => {
                            this.RotateScreen(index);
                        }}>

                        {value}

                    </div>;

            })}

        </div>;      
        
        return (
            <div id="logged-in-account">

                <div id="upper-bar-wrapper">

                    <Upper_Bar account_data={this.state.owner_user_account} connection_list={this.state.connection_list}/>

                </div>

                <div id="logged-in-columns-wrapper">

                    {this.state.Columns.map((info, index) => {

                        return <div 
                                className={`logged-in-column ${info.is_main ? "main" : ""} ${this.state.focused_column === info.id ? "focused": ""}`} 
                                id={info.id}
                                key={info.id}  
                                tabIndex={0} 
                                onClick={(e)=>{
                                    
                                    if(this.state.focused_column !== info.id){

                                        this.setState({focused_column: info.id});
                                    }
                                    
                                }}
                            >
                            
                            <div className="screen-wrapper">

                                <Screen 
                                    owner_user_account={this.state.owner_user_account} 
                                    screen_type={info.screen} 
                                    connection_list={this.state.connection_list}/>

                            </div>

                            {info.is_main ? main_options : ""}

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Logged_In_Account;