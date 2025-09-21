require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

const port = process.env.PORT || 4000;

connectDB();

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});