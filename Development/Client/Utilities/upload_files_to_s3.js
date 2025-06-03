
let Upload_Files_To_S3 = async (url, files = [], json_obj = {}) => {

    if (files.length === 0) {
        alert("No file(s) selected");
        return;
    }

    let formData = new FormData();

    for (let file of files) {
        formData.append('files', file);
    }

    formData.append('metadata', JSON.stringify(json_obj));

    let res = await fetch(url, {
        method: "POST",
        body: formData
    });

    let resJson = await res.json();

    if (resJson) {

        return resJson;
    }

    alert("Error on uploading the file(s)");

    return null;

};

export default Upload_Files_To_S3;