import {useCallback, useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

function App() {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const onChange = useCallback((event) => {
        const { value } = event.target;
        setValue(value);
    }, [value])

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages');

            setMessages(prevState => [data, ...prevState]);
            await subscribe();
        } catch (e) {
            setTimeout(() => {
                subscribe();
            }, 700)
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        });
    }

  return (
    <>
        <input type="text" value={value} onChange={onChange}/>
        <button onClick={sendMessage}>Отправить сообщение</button>
        <div className={'messages'}>
            {messages.map(mess =>
                <div key={mess.id}>
                    {mess.message}
                </div>
            )}
        </div>
    </>
  )
}

export default App
