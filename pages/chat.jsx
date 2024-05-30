import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from '../styles/Home.module.css';

const socket = io();

export default function Chat({ topic }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', topic);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leaveRoom', topic);
      socket.off();
    };
  }, [topic]);

  const sendMessage = () => {
    socket.emit('message', { topic, text: message });
    setMessage('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat on {topic}</h1>
      <div className={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">{msg.text}</div>
        ))}
      </div>
      <input
        className={styles.input}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.button} onClick={sendMessage}>Send</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      topic: context.query.topic || null,
    },
  };
}
