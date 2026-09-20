import React, {Component} from 'react';
import Stream_List_Components from './Stream_List_Components/stream_list_components.js';
import Video_Stream_Screen from './Video_Stream_Screen/video_stream_screen.js';
import init_websocket from '@init_websocket';
import Request_URLs from '@request_urls';
import './live_stream.less';

class Live_Stream extends Component {
    
    Screen = {
        "Stream_List_Components": Stream_List_Components,
        "Video_Stream_Screen": Video_Stream_Screen
    };
    
    constructor(props){
        
        super(props);

        let {owner_user_account} = props;
        
        this.state = {
            owner_user_account,
            current_screen: "Stream_List_Components",
            is_host: false,
            stream_id: null,
            stream_title: "",
            active_streams: {},
            search_criteria: {},
            turn_server_cred: {username: "", credential: ""},
            initial_screen_event: null //This is an event that gets triggered when the screen gets newly loaded, it's optional
        };

    }
    
    async componentDidMount(){

        this.Init_Socket();
        await this.Get_Turn_Server_Cred();

        let {initial_screen_event} = this.props;

        //Call the initial_screen_event if there is any. Passing the this object would let  
        //whichever component set the initial_screen_event to be able to control this component
        initial_screen_event && initial_screen_event(this);
    }

    componentWillUnmount(){
        this.socket?.disconnect();
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Set_Current_Screen = (screen, is_hosting = false, stream_id = null, stream_title = "") => {
        
        this.setState({current_screen: screen, is_host: is_hosting, stream_id: stream_id, stream_title});
        
    }

    //Intended to be called before the component is mounted
    Init_Socket = () => {
        
        this.socket = init_websocket('/video_streams', this.Init_Socket);

        this.socket?.on('connect', () => {

            if (!this.socket.id) {
                return;
            }
            
            this.Gather_Stream_List({});
            
        });
        
        this.socket?.on('catch_streams', ({ streams })=>{
            
            this.setState({
                active_streams: streams
            });
            
        });
        
        this.socket?.on('update_stream_list', ({ streams })=>{
            
            this.socket?.emit("request_streams", {search: this.state.search_criteria});
            
        });
        
    }

    Update_Search_Criteria = (new_criteria) => {

        this.setState({search_criteria: new_criteria});
    }
    
    Gather_Stream_List = () => {

        let {search_criteria: search_parameters} = this.state;
        
        this.socket?.emit('request_streams', {search: search_parameters});
        
    }

    Get_Turn_Server_Cred = async ()=>{

        let {get_turn_server_credential} = Request_URLs;

        let {turn_server_cred} = await(await fetch(get_turn_server_credential, 
            {
                method: "GET"
            }
        )).json();

        this.setState({
            turn_server_cred
        });

    }
    
    render(){

        let {
            active_streams, 
            stream_id, 
            is_host, 
            owner_user_account, 
            current_screen, 
            stream_title, 
            turn_server_cred,
            initial_screen_event //This is an event that gets triggered whenever a new screen is loaded, it's optional
        } = this.state;
        
        const Com = this.Screen[current_screen];
        
        return (
            <div id="live-stream-wrapper">

                <Com owner_user_account={owner_user_account} 
                    set_current_screen={this.Set_Current_Screen} 
                    is_host={is_host}
                    stream_id={stream_id}
                    stream_title={stream_title}
                    active_streams={active_streams}
                    search_streams={this.Gather_Stream_List}
                    update_search_criteria={this.Update_Search_Criteria}
                    turn_server_cred={turn_server_cred}
                    initial_screen_event={initial_screen_event}
                />

            </div>
        );
    }
}

export default Live_Stream;