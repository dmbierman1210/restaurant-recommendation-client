import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:8000'; // Adjust if backend runs elsewhere

function App() {
  const [userId, setUserId] = useState(1); // Demo user
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ restaurant_id: '', rating: '', comment: '', visit_date: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, [userId]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/recommendations?user_id=${userId}`);
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (e) {
      setMessage('Failed to fetch recommendations.');
    }
    setLoading(false);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          restaurant_id: Number(feedback.restaurant_id),
          rating: feedback.rating ? Number(feedback.rating) : undefined,
          comment: feedback.comment || undefined,
          visit_date: feedback.visit_date || undefined,
        }),
      });
      const data = await res.json();
      setMessage(data.message || 'Feedback submitted.');
      setFeedback({ restaurant_id: '', rating: '', comment: '', visit_date: '' });
      fetchRecommendations();
    } catch (e) {
      setMessage('Failed to submit feedback.');
    }
  };

  return (
    <div className="App">
      <h1>Restaurant Recommendations</h1>
      <div>
        <label>User ID: </label>
        <input type="number" value={userId} onChange={e => setUserId(Number(e.target.value))} min={1} />
      </div>
      <button onClick={fetchRecommendations} disabled={loading} style={{ margin: '10px 0' }}>
        {loading ? 'Loading...' : 'Refresh Recommendations'}
      </button>
      {message && <div style={{ color: 'green', margin: '10px 0' }}>{message}</div>}
      <h2>Recommended Restaurants</h2>
      <ul>
        {recommendations.length === 0 && <li>No recommendations found.</li>}
        {recommendations.map((r: any) => (
          <li key={r.id}>
            <b>{r.name}</b> ({r.cuisine || 'N/A'})<br />
            Address: {r.address || 'N/A'}<br />
            Avg Rating: {r.avg_rating?.toFixed(2)} | Visits: {r.visit_count}
          </li>
        ))}
      </ul>
      <h2>Submit Feedback</h2>
      <form onSubmit={submitFeedback} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
        <label>
          Restaurant ID:
          <input name="restaurant_id" value={feedback.restaurant_id} onChange={handleFeedbackChange} required type="number" min={1} />
        </label>
        <label>
          Rating (1-5):
          <input name="rating" value={feedback.rating} onChange={handleFeedbackChange} type="number" min={1} max={5} />
        </label>
        <label>
          Comment:
          <input name="comment" value={feedback.comment} onChange={handleFeedbackChange} />
        </label>
        <label>
          Visit Date (YYYY-MM-DD):
          <input name="visit_date" value={feedback.visit_date} onChange={handleFeedbackChange} type="date" />
        </label>
        <button type="submit" style={{ marginTop: 10 }}>Submit Feedback</button>
      </form>
    </div>
  );
}

export default App;
