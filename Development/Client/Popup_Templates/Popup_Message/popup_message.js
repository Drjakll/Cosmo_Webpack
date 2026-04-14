import './popup_message.less';

let Create_Popup = async function(type = "message", msg = "", result = null){

    let create_basics = ()=>{
        
        let popup_box_wrapper = document.createElement("div");

        let the_message_wrapper = document.createElement("div");

        let the_buttons_wrapper = document.createElement("div");

        popup_box_wrapper.id = "popup-box-wrapper";
        the_message_wrapper.id = "the-message-wrapper";
        the_buttons_wrapper.id = "the-buttons-wrapper";

        popup_box_wrapper.appendChild(the_message_wrapper);
        popup_box_wrapper.appendChild(the_buttons_wrapper);

        return [popup_box_wrapper, the_message_wrapper, the_buttons_wrapper];

    };

    let create_message = ()=>{

        let the_msg_label = document.createElement("label");

        the_msg_label.textContent = msg;

        the_msg_label.id = "the-msg-label";

        return the_msg_label;

    };

    let create_buttons = (resolve) => {

        let destroy_big_sheet = (e)=>{

            let big_sheet = document.getElementById("big-msg-sheet-cover");

            document.body.removeChild(big_sheet);

            resolve(true);

        }

        let ok_button = document.createElement("button");
        ok_button.className = "button ok";
        ok_button.textContent = "Ok";

        ok_button.addEventListener("click", destroy_big_sheet);

        let yes_button = document.createElement("button");
        yes_button.className = "button yes";
        yes_button.textContent = "Yes";

        yes_button.addEventListener("click", (e)=>{

            result?.agree = true;  

            destroy_big_sheet(e);
        });

        let no_button = document.createElement("button");
        no_button.className = "button no";
        no_button.textContent = "No";

        no_button.addEventListener("click", (e)=>{

            result?.agree = false;

            destroy_big_sheet(e);
        });

        let input_wrapper = document.createElement("div");
        input_wrapper.id = "input-wrapper";

        let input = document.createElement("input");
        input.type = "text";
        input.className = "input text";
        input.maxLength = result?.maxLength ?? 20;

        input.addEventListener("change", (e)=>{
            result?.input = e.target.value; 
        });

        input_wrapper.appendChild(input);

        let submit = document.createElement("button");
        submit.className = "button submit";
        submit.textContent = "Submit";

        submit.addEventListener("click", (e)=>{

            result?.submit = true;

            destroy_big_sheet(e);
        });

        let cancel = document.createElement("button");
        cancel.className = "button cancel";
        cancel.textContent = "Cancel";

        cancel.addEventListener("click", (e)=>{

            result?.submit = false;

            destroy_big_sheet(e);
        })

        let buttons_wrapper = document.createElement("div");
        buttons_wrapper.id = "submit-buttons-wrapper";

        buttons_wrapper.appendChild(submit);
        buttons_wrapper.appendChild(cancel);

        input_wrapper.appendChild(buttons_wrapper);

        switch(type){
            case "confirm": 
                return [yes_button, no_button];
            case "message":
                return [ok_button];
            case "input":
                return [input_wrapper];
            default:
                return [ok_button];
        }
    };

    let create_big_sheet = ()=>{

        let big_sheet = document.createElement("div");

        big_sheet.id = "big-msg-sheet-cover";

        document.body.append(big_sheet);

        return big_sheet;
    };

    return new Promise((resolve)=>{
        let big_sheet = create_big_sheet();
        let [box_wrapper, msg_wrapper, buttons_wrapper] = create_basics();
        let msg_label = create_message();
        let buttons = create_buttons(resolve);

        for(let button of buttons){
            buttons_wrapper.appendChild(button);
        }

        big_sheet.appendChild(box_wrapper);
        msg_wrapper.appendChild(msg_label);
    });
}

export default Create_Popup;