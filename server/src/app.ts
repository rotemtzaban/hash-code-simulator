import express from 'express';

const app = express();
app.get('/api/isalive', (req, res) =>  res.json("allGood").send());

app.listen(5000);