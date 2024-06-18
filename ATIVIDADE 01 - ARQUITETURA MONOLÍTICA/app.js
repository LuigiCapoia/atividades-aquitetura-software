const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const postsRouter = require('./routes/posts');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', postsRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
