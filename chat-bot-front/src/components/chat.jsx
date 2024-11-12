import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { context } from "./context";


export default function Chat() {
    const [ messages, setMessages ] = useState([]);
    const [ inputMessage, setInputMessage ] = useState('');
    const { movie } = useContext(context);

    const handleMessage = async (e) => {
        e.preventDefault();
    
        if (inputMessage.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { name: 'You', content: inputMessage, date: new Date().toLocaleString(), level: 'info' }
            ]);
    
            setInputMessage('');
    
            try {   // usamos url del .env
                const res = await axios.post(process.env.REACT_APP_BACKEND_URL, { message: inputMessage, movie: movie });
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { name: 'Bot', content: res.data.message, date: new Date().toLocaleString(), level: 'info' }
                ]);
            } catch (err) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { name: 'Bot', content: 'Sorry, I could not understand that.', date: new Date().toLocaleString(), level: 'danger' }
                ]);
            }
        }
    };
    

    return (
        <div className="border rounded w-50 h-75 p-2 d-flex flex-column">
            <h1 className="h5 text-center mb-3">Movie Chat-bot</h1>
            {
            movie? <h2 className="h6 text-center mb-3">Pregúntame algo sobre {movie}</h2>
            : <h2 className="h6 text-center mb-3">Selecciona una película</h2>
        }
            <ul
            className="list-unstyled overflow-auto"
            style={{
                height: '400px',
                flexGrow: 1,
            }}
            >
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