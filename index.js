const express = require('express');
const app = express();
const Port = 8001;
const cookieParser = require('cookie-parser');
const connect = require('./connect');
const URL = require('./models/url');
const path = require('path');
const {restrictToLoggedinUserOnly,checkAuth} = require('./middleware/auth');
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');

connect();

app.set("view engine", "ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', checkAuth , staticRouter);
// Ensure no middleware or other routes are interfering with /signup. For example, if another route
// (like a catch-all /:shortID) is intercepting the request:

app.use('/url', restrictToLoggedinUserOnly , urlRouter);
app.use('/user' , userRouter);

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

// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
