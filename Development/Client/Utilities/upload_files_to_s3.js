
import { io } from 'socket.io-client';

//If need to display upload progress, then pass the state and the setSate
let Upload_Files_To_S3 = async (url, files = [], json_obj = {}, update = null) => {

    if (files.length === 0) {
        alert("No file(s) selected");
        return null;
    }

    let socket = await new Promise((resolve, reject)=>{

        let socket = io('/');

        socket.on('connect', async ()=>{

            resolve(socket);

        });

        socket.once('connect_error', reject);
        
    });

    socket.on('init_upload', ({key, url})=>{

        if(!update){
            return;
        }

        update({key, url, progress_completed: 0, all_completed: false});

    });

    socket.on('track_upload_progress', ({key, url, progress_completed})=>{

        if(!update){
            return;
        }

        progress_completed = parseInt(progress_completed);

        update({key, url, progress_completed, all_completed: false});
    });

    json_obj.socket_id = socket.id;

    let formData = new FormData();

    for (let file of files) {
        formData.append('files', file);
    }

    formData.append('metadata', JSON.stringify(json_obj));

    let res = await fetch(url, {
        method: "POST",
        body: formData
    });

    
    socket.disconnect();

    update && update({all_completed: true});

    let resJson = await res.json();

    if (resJson) {

        return resJson;

    }

};

export default Upload_Files_To_S3;