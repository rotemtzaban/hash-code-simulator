import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import Mongoose from 'mongoose';

Mongoose.connect('mongodb://localhost:27017/hashcode', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api', routes);
    app.get('/api/isalive', (req, res) => {
        res.send('server is up!');
    });

    app.listen(5000, () => {
        // tslint:disable-next-line: no-console
        console.log('Server started on port 5000!');
    });
});
