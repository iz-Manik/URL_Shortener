const express = require('express');
const app = express();
const urlRouter = require('./routes/url');
const Port = 8001;
const connect = require('./connect');
const URL = require('./models/url');
const path = require('path');
const staticRouter = require('./routes/staticRouter');
connect();

app.set("view engine", "ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to display all URLs
app.get('/test', async (req, res) => {
  try {
    const allURLs = await URL.find({});
    res.render('home',{urls:allURLs});
  } catch (err) {
    res.status(500).send('Error retrieving URLs');
  }
});

// Route to handle short URL redirection
app.get('/:shortID', async (req, res) => {
  try {
    const shortID = req.params.shortID;
    const url = await URL.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true } // Return the updated document
    );

    if (!url) {
      return res.status(404).send('URL not found');
    }

    res.redirect(url.redirectURL);
  } catch (err) {
    res.status(500).send('Error redirecting URL');
  }
});

app.use('/url', urlRouter);
app.use('/', staticRouter);

// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
