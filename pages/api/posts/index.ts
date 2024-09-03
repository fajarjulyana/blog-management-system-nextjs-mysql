// pages/api/posts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../models/Post';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    const { title, content, published } = req.body;

    try {
      const newPost = await Post.create({ title, content, published });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Failed to create post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
