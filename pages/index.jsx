import { useState } from 'react';
import TopicList from '../components/TopicList';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const router = useRouter();

  const handleJoinChat = () => {
    if (selectedTopic) {
      router.push(`/chat?topic=${selectedTopic}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select a Topic</h1>
      <TopicList setTopic={setSelectedTopic} />
      <button className={styles.button} onClick={handleJoinChat}>Join Chat</button>
    </div>
  );
}
