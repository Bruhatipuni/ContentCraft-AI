import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Gauge,
  X
} from 'lucide-react';
import { storageService } from '../services/storageService';

export function ContentCalendar({ calendarPosts, onUpdatePosts, activeBrand }) {
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Post Form State
  const [newPost, setNewPost] = useState({
    title: '',
    platform: 'linkedin',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    type: 'Social Post',
    status: 'Scheduled',
    content: '',
    aiScore: 92
  });

  const platforms = ['All', 'linkedin', 'instagram', 'twitter', 'reel', 'email'];
  const statuses = ['All', 'Scheduled', 'Approved', 'In Review', 'Draft'];

  const filteredPosts = calendarPosts.filter(p => {
    const matchPlatform = selectedPlatform === 'All' || p.platform === selectedPlatform;
    const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchPlatform && matchStatus;
  });

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const created = storageService.addCalendarPost({
      ...newPost,
      brandId: activeBrand?.id || 'glowskin'
    });
    onUpdatePosts([created, ...calendarPosts]);
    setIsModalOpen(false);
    setNewPost({
      title: '',
      platform: 'linkedin',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      type: 'Social Post',
      status: 'Scheduled',
      content: '',
      aiScore: 92
    });
  };

  const handleDelete = (id) => {
    storageService.deleteCalendarPost(id);
    onUpdatePosts(calendarPosts.filter(p => p.id !== id));
  };

  const handleStatusChange = (post, newStatus) => {
    const updated = { ...post, status: newStatus };
    storageService.updateCalendarPost(updated);
    onUpdatePosts(calendarPosts.map(p => p.id === post.id ? updated : p));
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(calendarPosts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `contentcraft-calendar-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 uppercase tracking-wider">
              Feature 10 · Workflow Pipeline
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Content Calendar & Auto-Scheduler</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Campaign Publishing Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Review, approve, and manage synchronized scheduled publishing pipelines across social networks.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-neutral-800"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Calendar JSON</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-500/20 flex items-center space-x-1.5 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 glass-panel p-3.5 rounded-xl border border-slate-200 dark:border-neutral-800">
        
        {/* Platform Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 dark:text-neutral-500 mr-1 flex items-center">
            <Filter className="w-3 h-3 mr-1" /> Platform:
          </span>
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-all ${
                selectedPlatform === p
                  ? 'bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/40 font-bold'
                  : 'bg-slate-50 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 border border-slate-200 dark:border-neutral-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1.5">
          <span className="text-xs text-slate-500 dark:text-neutral-500 mr-1">Status:</span>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                selectedStatus === s
                  ? 'bg-slate-200 dark:bg-neutral-800 text-slate-900 dark:text-neutral-100 border border-slate-300 dark:border-neutral-700 font-bold'
                  : 'bg-slate-50 dark:bg-neutral-900/60 text-slate-500 dark:text-neutral-500 hover:text-slate-800 dark:hover:text-neutral-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="glass-panel glass-panel-hover rounded-xl p-5 border border-slate-200 dark:border-neutral-800/80 flex flex-col justify-between space-y-4 shadow-2xs"
          >
            <div className="space-y-3">
              {/* Card Top: Platform Badge, Time, and Status */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  post.platform === 'linkedin' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30' :
                  post.platform === 'instagram' ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/30' :
                  post.platform === 'twitter' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30' :
                  post.platform === 'reel' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30' :
                  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                }`}>
                  {post.platform}
                </span>

                <div className="flex items-center space-x-2">
                  <select
                    value={post.status}
                    onChange={(e) => handleStatusChange(post, e.target.value)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-white dark:bg-neutral-950 focus:outline-none cursor-pointer ${
                      post.status === 'Scheduled' ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                      post.status === 'Approved' ? 'text-blue-600 dark:text-blue-400 border-blue-500/30' :
                      post.status === 'In Review' ? 'text-amber-600 dark:text-amber-400 border-amber-500/30' :
                      'text-slate-500 dark:text-neutral-400 border-slate-200 dark:border-neutral-800'
                    }`}
                  >
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              {/* Title & Scheduled Time */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-neutral-100 line-clamp-1">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-neutral-400 mt-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-400 dark:text-neutral-500" />
                  <span>{post.date} at {post.time}</span>
                  {post.aiScore && (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center ml-2 font-bold">
                      <Gauge className="w-3 h-3 mr-0.5" />
                      {post.aiScore}/100
                    </span>
                  )}
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/60 text-xs text-slate-800 dark:text-neutral-300 leading-relaxed font-sans line-clamp-4">
                {post.content}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 dark:text-neutral-500 uppercase tracking-wider font-mono">
                ID: {post.id}
              </span>

              <button
                onClick={() => handleDelete(post.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                title="Remove scheduled post"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 dark:text-neutral-500 space-y-2">
            <CalendarIcon className="w-8 h-8 mx-auto opacity-50 text-violet-500" />
            <p className="text-sm">No scheduled posts found for current filter.</p>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-900 dark:text-neutral-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-neutral-100 flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-violet-500" />
                <span>Schedule New Post for {activeBrand?.name}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Post Title</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="e.g. Saffron Micro-Routine Carousel"
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Platform</label>
                  <select
                    value={newPost.platform}
                    onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">X (Twitter)</option>
                    <option value="reel">Reel / YouTube</option>
                    <option value="email">Email Newsletter</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Workflow Status</label>
                  <select
                    value={newPost.status}
                    onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Approved">Approved</option>
                    <option value="In Review">In Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Date</label>
                  <input
                    type="date"
                    required
                    value={newPost.date}
                    onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Time (Optimal Slot)</label>
                  <input
                    type="time"
                    required
                    value={newPost.time}
                    onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Post Copy</label>
                <textarea
                  rows={4}
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Paste or write finalized post copy..."
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg p-3 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-violet-500 font-sans"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold"
                >
                  Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
