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
  const filtered = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.summary.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = idx => {
    setSaved([...saved, idx]);
  };

  return (
    <div className="w-full flex justify-center items-start p-4 md:p-8">
      <div className="card card-gradient w-full max-w-5xl mt-8 p-4 md:p-8">
        <h2 className="mb-4 text-primary text-2xl md:text-3xl font-bold">Health Blog & News</h2>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input input-dark mb-6 w-full max-w-lg"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, idx) => (
            <div key={idx} className="card card-alt flex flex-col gap-2 p-4 h-full shadow-sm border border-neutral-200 bg-white">
              <div className="font-bold text-lg text-primary mb-1">{article.title}</div>
              <div className="text-neutral-700 text-base flex-1">{article.summary}</div>
              <div className="text-neutral-400 text-xs mb-2">Published: {new Date(article.date).toLocaleDateString()}</div>
              <div className="flex gap-2 mt-auto">
                <button className="btn btn-primary btn-sm">Read More</button>
                <button className={`btn btn-outline btn-sm ${saved.includes(idx) ? 'opacity-60' : ''}`} onClick={() => handleSave(idx)} disabled={saved.includes(idx)}>
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