import fs from 'fs/promises';
import path from 'path';
import io from 'socket.io-client'
import { fileURLToPath } from "url";

const __pathToThisFile = fileURLToPath(import.meta.url).replace('/upload_photos.js', '').replace('\\upload_photos.js', '');

const file_paths = [
    '/Photo_Samples/img1.jpeg',
    '/Photo_Samples/img2.jpeg',
    '/Photo_Samples/img3.jpg'
];

const mime_types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif"
};

let Upload_Progress_Tracking = async ()=>{

    let socket = await new Promise((resolve, reject)=>{

        let new_socket = io('ws://localhost:8080/');

        new_socket.on('connect', async ()=>{

            resolve(new_socket);

        });

        new_socket.once('connect_error', reject);

    });

    return socket;
}

let Create_Form_Data = async (target_id_type, target_id, album_name)=>{

    let form_data = new FormData();

    for(const f_path of file_paths){

        const image_buffer = await fs.readFile(`${__pathToThisFile}${f_path}`);
        const filename = path.basename(f_path);
        const extension = path.extname(f_path).toLowerCase();

        const file = new Blob([image_buffer], {
            type: mime_types[extension] ?? "application/octet-stream"
        });

        form_data.append("files", file, filename);
    }

    let socket = await Upload_Progress_Tracking();

    socket?.on('init_upload', ({key, url})=>{

        console.log(`${url} started`);

    });

    socket?.on('track_upload_progress', ({key, url, progress_completed})=>{

        progress_completed = parseInt(progress_completed);

        console.log(`\n\n${url} \n${progress_completed}% Completed\n`);

    });

    socket?.on('upload_completed', ()=>{

        socket.disconnect();
    });

    const body = {
        target_id_type,
        target_id,
        album_name,
        socket_id: socket?.id
    }

    form_data.append("metadata", JSON.stringify(body));

    return form_data;
}

let insert_options = {
    end_point: `/upload_photos`,
    test_cases: [
        {
            description: "Upload the photos",
            data: {
                url_params: [],
                body: await Create_Form_Data('profile_id', 1, 'Profile_Picture'),
                is_files: true
            },
        }
    ],
    req_type: "POST"
};

let delete_options = {
    end_point: `/delete_photos`,
    test_cases: [
        {
            description: "Erase the photos that it just uploaded",
            data: {
                url_params: [],
                body: {},
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "result",
                        name_for_delete: "photos"
                    }
                ]
            }
        }
    ],
    req_type: "POST"
};

export default [insert_options, delete_options];