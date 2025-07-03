import React, { useState } from 'react';

const articles = [
  {
    title: '5 Simple Ways to Boost Your Immune System',
    summary: 'Discover easy lifestyle changes to strengthen your bodys natural defenses and stay healthy year-round.',
    date: '2024-05-01',
  },
  {
    title: 'The Importance of Regular Exercise',
    summary: 'Learn how daily physical activity can improve your mood, energy, and overall well-being.',
    date: '2024-04-28',
  },
  {
    title: 'Healthy Eating on a Budget',
    summary: 'Tips and tricks for maintaining a nutritious diet without breaking the bank.',
    date: '2024-04-25',
  },
  {
    title: 'Managing Stress in a Busy World',
    summary: 'Explore practical strategies to reduce stress and improve your mental health.',
    date: '2024-04-20',
  },
  {
    title: 'Why Sleep Matters: The Science of Rest',
    summary: 'Understand the crucial role of sleep in your health and how to get better rest.',
    date: '2024-04-15',
  },
];

const BlogFeed = () => {
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'general',
    tags: ''
  });

  const allArticles = [...articles, ...userArticles];
  const filtered = allArticles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.summary.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = idx => {
    setSaved([...saved, idx]);
  };

  return (
    <div className="w-full flex justify-center items-start p-4 md:p-8">
      <div className="card card-gradient w-full max-w-6xl mt-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-primary text-2xl md:text-3xl font-bold mb-4 md:mb-0">Health Blog & News</h2>
          
        </div>
        
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input input-dark mb-6 w-full max-w-lg"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, idx) => (
            <div key={article.id || idx} className="card card-alt flex flex-col gap-2 p-4 h-full shadow-sm border border-neutral-200 bg-white">
              <div className="flex justify-between items-start mb-1">
                <div className="font-bold text-lg text-primary">{article.title}</div>
                {article.isUserCreated && (
                  <button 
                    onClick={() => deleteUserArticle(article.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {article.category && (
                <div className="mb-2">
                  <span className="badge badge-secondary text-xs">{article.category}</span>
                </div>
              )}
              
              <div className="text-neutral-700 text-base flex-1">{article.summary}</div>
              
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {article.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="badge badge-outline text-xs">#{tag}</span>
                  ))}
                </div>
              )}
              
              <div className="text-neutral-400 text-xs mb-2">
                Published: {new Date(article.date).toLocaleDateString()}
                {article.author && <span> • By {article.author}</span>}
              </div>
              
              <div className="flex gap-2 mt-auto">
                <button className="btn btn-primary btn-sm">Read More</button>
                <button 
                  className={`btn btn-outline btn-sm ${saved.includes(idx) ? 'opacity-60' : ''}`} 
                  onClick={() => handleSave(idx)} 
                  disabled={saved.includes(idx)}
                >
                  {saved.includes(idx) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogFeed;