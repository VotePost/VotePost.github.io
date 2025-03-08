//import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsbczcgdaatpfewgydca.supabase.co';  //Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYmN6Y2dkYWF0cGZld2d5ZGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MTQwNjMsImV4cCI6MjA1NjE5MDA2M30.E5qu7-RsBBY_br_RhAn74zwEA9wntB4VEJDw67UKAts';  //Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);
alert()
// get number of votes from poll_responses, get options from polls
// create bar graph, labels are options and number of votes are values
// when window is closed, if end=true: delete poll from DB (OPTIONAL.)
async function fetchData() {
  let { data, error } = await supabase
    .from('your_table')  // Replace with your actual table name
    .select('*');  // Select all columns or specify the needed ones

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data;
}
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const dataFromSupabase = await fetchData();

  // Format data for Google Charts
  const chartData = [['Category', 'Value']];  // Adjust based on your dataset
  dataFromSupabase.forEach(row => {
    chartData.push([row.category, row.value]);  // Adjust column names
  });

  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    title: 'My Chart',
    width: 600,
    height: 400,
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
