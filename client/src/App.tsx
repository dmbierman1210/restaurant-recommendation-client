import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Grid, Snackbar, Alert, CircularProgress } from '@mui/material';

const API_BASE = 'http://localhost:8000'; // Adjust if backend runs elsewhere

function App() {
  const [userId, setUserId] = useState(1); // Demo user
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ restaurant_id: '', rating: '', comment: '', visit_date: '' });
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchRecommendations();
    // eslint-disable-next-line
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
      setOpenSnackbar(true);
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
      setOpenSnackbar(true);
      setFeedback({ restaurant_id: '', rating: '', comment: '', visit_date: '' });
      fetchRecommendations();
    } catch (e) {
      setMessage('Failed to submit feedback.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Restaurant Recommendations
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <TextField
          label="User ID"
          type="number"
          value={userId}
          onChange={e => setUserId(Number(e.target.value))}
          inputProps={{ min: 1 }}
          sx={{ width: 120, mr: 2 }}
        />
        <Button variant="contained" onClick={fetchRecommendations} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Refresh Recommendations'}
        </Button>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={message.includes('Failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h5" gutterBottom>
        Recommended Restaurants
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>
      ) : (
        <Grid container spacing={2}>
          {recommendations.length === 0 && (
            <Grid item xs={12}><Typography>No recommendations found.</Typography></Grid>
          )}
          {recommendations.map((r: any) => (
            <Grid item xs={12} sm={6} md={4} key={r.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{r.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{r.cuisine || 'N/A'}</Typography>
                  <Typography variant="body2">Address: {r.address || 'N/A'}</Typography>
                  <Typography variant="body2">Avg Rating: {r.avg_rating?.toFixed(2)} | Visits: {r.visit_count}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Submit Feedback</Typography>
        <Box component="form" onSubmit={submitFeedback} sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, mx: 'auto' }}>
          <TextField
            label="Restaurant ID"
            name="restaurant_id"
            value={feedback.restaurant_id}
            onChange={handleFeedbackChange}
            required
            type="number"
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Rating (1-5)"
            name="rating"
            value={feedback.rating}
            onChange={handleFeedbackChange}
            type="number"
            inputProps={{ min: 1, max: 5 }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Comment"
            name="comment"
            value={feedback.comment}
            onChange={handleFeedbackChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Visit Date"
            name="visit_date"
            value={feedback.visit_date}
            onChange={handleFeedbackChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">Submit Feedback</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
