// pages/admin.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

const Admin = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setTitle(post.title);
    setContent(post.content);
    setPublished(post.published);
    setEditMode(true);
  };

  const handleDelete = async (postId: number) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editMode && currentPost) {
      // Update existing post
      try {
        await axios.put(`/api/posts/${currentPost.id}`, {
          title,
          content,
          published,
        });

        setPosts(posts.map(post => post.id === currentPost.id ? { ...post, title, content, published } : post));
        resetForm();
      } catch (error) {
        console.error('Failed to update post:', error);
      }
    } else {
      // Create new post
      try {
        const response = await axios.post('/api/posts', {
          title,
          content,
          published,
        });

        setPosts([...posts, response.data]);
        resetForm();
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setPublished(false);
    setEditMode(false);
    setCurrentPost(null);
  };

  return (
    <div className="container mt-5">
      <h1>Admin Panel</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="published">
            Published
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {editMode ? 'Update Post' : 'Create Post'}
        </button>
        {editMode && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>All Posts</h2>
      {posts.length > 0 ? (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                {post.published ? <span className="badge bg-success">Published</span> : <span className="badge bg-warning">Draft</span>}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Admin;
