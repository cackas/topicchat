import connectDB from '../../utils/db';
import Topic from '../../models/Topic';

export default async function handler(req, res) {
    await connectDB();
    if (req.method === 'GET') {
        const topics = await Topic.find({});
        res.status(200).json(topics);
    } else if (req.method === 'POST') {
        const { name } = req.body;
        const newTopic = new Topic({ name });
        await newTopic.save();
        res.status(201).json(newTopic);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
