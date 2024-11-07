import { useEffect, useState } from "react";
import axios from "axios";


export default function Chat() {
    const [ messages, setMessages ] = useState([]);
    const [ inputMessage, setInputMessage ] = useState('');


    const handleMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            setMessages([...messages, { name: 'You', content: inputMessage, date: new Date().toLocaleString(), level: 'info' }]);
            
            axios.get('https://api', {message: inputMessage})
            .then((res) => {
                setMessages([...messages, { name: 'Bot', content: res.data.message, date: new Date().toLocaleString(), level: 'info' }]);
            })
            .catch((err) => {
                setMessages([...messages, { name: 'Bot', content: 'Sorry, I could not understand that.', date: new Date().toLocaleString(), level: 'danger' }]);
            });
            
            setInputMessage('');
        }
    };

    return (
        <div className="border rounded w-50 h-75 p-2 d-flex flex-column">
            <h1 className="h5 text-center mb-3">Movie Chat-bot</h1>
            <ul className="list-unstyled overflow-auto" style={{ maxHeight: '400px' }}>
                {messages.map((m) => (
                    <li className='row'>
                        <div 
                            className={`col-9 fs-6 mx-4 my-1 p-2 rounded-4 text-start border lh-sm ${
                                m.name === 'You' ? 'bg-primary text-white ms-auto' : 'bg-light'
                            }`}
                        >
                            {m.content}
                            <div className='text-end small'>
                                {m.date.split(' ')[1].split(':').slice(0, 2).join(':')}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleMessage} className="d-flex mt-auto">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ask something..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-primary ms-2">Send</button>
            </form>
        </div>
    );
}