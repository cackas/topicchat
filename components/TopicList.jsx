// components/TopicList.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TopicList({ setTopic }) {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    async function fetchTopics() {
      const response = await axios.get('/api/topics');
      setTopics(response.data);
    }
    fetchTopics();
  }, []);

  const addTopic = async () => {
    const response = await axios.post('/api/topics', { name: newTopic });
    setTopics([...topics, response.data]);
    setNewTopic('');
  };

  return (
    <div className="space-y-4">
      <input
        className="border p-2 w-full"
        type="text"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        placeholder="Add new topic"
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addTopic}>Add Topic</button>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li
            key={topic._id}
            className="cursor-pointer p-2 border hover:bg-gray-200"
            onClick={() => setTopic(topic.name)}
          >
            {topic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
