import axios from 'axios';
import React, { useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine'
import { useNavigate } from "react-router-dom";

export default function Chat (props) {
    const user = localStorage.getItem("email")
    
    let navigate = useNavigate();

    async function getUser() {
        let formdata = new FormData();
        formdata.append('email', user);
        formdata.append('username', user);
        formdata.append('secret', user);
        await axios.put('https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key": "7ccdda40-9391-46e6-ae3b-ea7094fe437a" } }
        )
    };

    useEffect( () => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
        getUser()
        // eslint-disable-next-line
    }, []);

    return (
        <div className='container'>
        <ChatEngine
            height='85vh'
            userName={user}
            userSecret={user}
            projectID={'4c9a4123-7701-4745-ab48-5f6ebd77f695'}
        />
        </div>
        
    )
}
