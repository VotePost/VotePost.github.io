const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Required for handling JSON body in requests

// Supabase setup
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// GET poll results for a specific question
app.get('/api/poll-results', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('poll_responses')
      .select('option, count')
      .eq('question', 'What is your favorite color?'); // Change this dynamically if needed

    if (error) throw error;

    // Format data for Google Charts
    const chartData = [['Option', 'Votes']];
    data.forEach(({ option, count }) => {
      chartData.push([option, count]);
    });

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Increment Vote Count
app.post('/api/vote', async (req, res) => {
  const { question, option } = req.body;

  try {
    const { error } = await supabase
      .rpc('increment_vote', { question_param: question, option_param: option }); // Using RPC function

    if (error) throw error;

    res.json({ message: 'Vote recorded!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
