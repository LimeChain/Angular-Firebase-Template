const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const originsWhitelist = 'http://localhost:4200';
const authentication = require("./middlewares/auth");
const corsOptions = {
  origin: function(origin, callback){
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authentication);
app.use('/users', require('./users/users').router);
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})