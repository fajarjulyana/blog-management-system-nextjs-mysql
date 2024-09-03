// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../models/Post';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await Post.findByPk(id as string);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  } else if (req.method === 'PUT') {
    const { title, content, published } = req.body;

    try {
      const post = await Post.findByPk(id as string);
      if (post) {
        post.title = title;
        post.content = content;
        post.published = published;
        await post.save();
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Failed to update post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const post = await Post.findByPk(id as string);
      if (post) {
        await post.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

