// pages/index.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);  // Initialize filtered posts with all posts
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  return (
    <div className="container mt-5">
      <h1>Blog Posts</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <ul className="list-group">
          {filteredPosts.map((post) => (
            <li key={post.id} className="list-group-item">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.published ? <span className="badge bg-success">Published</span> : <span className="badge bg-warning">Draft</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Home;
