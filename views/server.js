const express = require('express');
const ejs = require('ejs');

const app = express();

// Custom middleware to check working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
    next();
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

app.use(express.static('public'));
app.use(checkWorkingHours);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Routes
app.get('/', (req, res) => {
  res.render('home', { activePage: 'home' });
});

app.get('/services', (req, res) => {
  res.render('services', { activePage: 'services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { activePage: 'contact' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
