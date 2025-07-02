import React, { useState } from 'react';

const AdminDashboardArticles = ({ articles, editingArticle, articleEdit, setArticleEdit, startEditArticle, saveEditArticle, setEditingArticle, deleteArticle, newArticle, setNewArticle, addArticle }) => {
  // Summary stats
  const totalArticles = articles.length;
  const published = articles.filter(a => a.status === 'published').length;
  const drafts = articles.filter(a => a.status === 'draft').length;
  const mostRecent = articles.length ? articles.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b) : null;

  // Search/filter
  const [search, setSearch] = useState('');
  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.author && a.author.toLowerCase().includes(search.toLowerCase()))
  );

  // Mock badge/engagement data for demo
  const getBadges = (article) => [
    <span key="views" className="badge badge-secondary bg-opacity-80">{article.views ? `${article.views} views` : '0 views'}</span>,
    <span key="likes" className="badge badge-secondary bg-opacity-80">{article.likes ? `${article.likes} likes` : '0 likes'}</span>,
    <span key="status" className={`badge ${article.status === 'published' ? 'badge-success' : 'badge-warning'} bg-opacity-80`}>{article.status || 'draft'}</span>,
  ];

  return (
    <div className="animate-slideInUp w-full max-w-7xl mx-auto px-2 md:px-6 py-4">
      <h2 className="text-2xl font-bold text-primary mb-6">Blog Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* 1st Column: Summary/statistics */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-4 flex flex-col items-center">
            <span className="text-lg font-semibold text-primary">Total Articles</span>
            <span className="text-2xl font-bold">{totalArticles}</span>
          </div>
          <div className="glass-card p-4 flex flex-col items-center">
            <span className="text-lg font-semibold text-primary">Published</span>
            <span className="text-2xl font-bold text-success">{published}</span>
          </div>
          <div className="glass-card p-4 flex flex-col items-center">
            <span className="text-lg font-semibold text-primary">Drafts</span>
            <span className="text-2xl font-bold text-warning">{drafts}</span>
          </div>
          <div className="glass-card p-4 flex flex-col items-center">
            <span className="text-lg font-semibold text-primary">Most Recent</span>
            <span className="text-md font-bold text-info">{mostRecent ? mostRecent.title : '-'}</span>
          </div>
        </div>
        {/* 2nd Column: Add blog form with date and badges */}
        <div className="flex flex-col gap-6">
          <div className="card card-gradient">
            <div className="card-header">
              <h3 className="card-title">Add New Article</h3>
            </div>
            <form onSubmit={addArticle} className="flex flex-col gap-4 items-end">
              <div className="form-group w-full">
                <label className="form-label">Title</label>
                <input
                  value={newArticle.title}
                  onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="Enter article title"
                  className="input-dark w-full"
                />
              </div>
              <div className="form-group w-full">
                <label className="form-label">Publish Date</label>
                <input
                  value={newArticle.date}
                  onChange={e => setNewArticle({ ...newArticle, date: e.target.value })}
                  type="date"
                  className="input-dark w-full"
                />
              </div>
              {/* Demo badges for preview */}
              <div className="flex flex-wrap gap-2 w-full mb-2">
                <span className="badge badge-secondary bg-opacity-80">0 views</span>
                <span className="badge badge-secondary bg-opacity-80">0 likes</span>
                <span className="badge badge-warning bg-opacity-80">draft</span>
              </div>
              <button type="submit" className="btn btn-primary w-full">Add Article</button>
            </form>
          </div>
          {/* Search Bar */}
          <div className="flex flex-col gap-2">
            <input
              className="input-dark w-full"
              placeholder="Search articles by title or author..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* 3rd Column: Articles grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredArticles.map(article => (
            <div key={article.id} className="card glass-card hover:shadow-lg transition-all p-4 flex flex-col justify-between h-full">
              <div className="flex-1">
                {editingArticle === article.id ? (
                  <div className="flex flex-col gap-2 mb-2">
                    <input
                      value={articleEdit.title}
                      onChange={e => setArticleEdit({ ...articleEdit, title: e.target.value })}
                      className="input-dark flex-1"
                    />
                    <input
                      value={articleEdit.date}
                      onChange={e => setArticleEdit({ ...articleEdit, date: e.target.value })}
                      type="date"
                      className="input-dark w-full"
                    />
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-semibold text-primary mb-1">{article.title}</h4>
                    <div className="flex flex-wrap gap-2 text-xs mb-1">
                      <span className="badge badge-info bg-opacity-80">{article.author || 'Unknown Author'}</span>
                      {getBadges(article)}
                    </div>
                    <div className="text-sm text-neutral-400 mb-1">
                      Published: {article.date ? new Date(article.date).toLocaleDateString() : '-'}
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {editingArticle === article.id ? (
                  <>
                    <button onClick={() => saveEditArticle(article.id)} className="btn btn-primary btn-xs">Save</button>
                    <button onClick={() => setEditingArticle(null)} className="btn btn-ghost btn-xs">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditArticle(article)} className="btn btn-outline btn-xs">Edit</button>
                    <button onClick={() => deleteArticle(article.id)} className="btn bg-error text-white btn-xs">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardArticles;
