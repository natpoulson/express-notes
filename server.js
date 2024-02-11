// TODO: Implement express.js and connect middleware
const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
});