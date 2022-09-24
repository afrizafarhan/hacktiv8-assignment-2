const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const config = require('./utils/config');

const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoute);
app.use('/users', userRoute);

app.listen(config.server.port, () => {
  console.log(`http://localhost:${config.server.port}`)
})