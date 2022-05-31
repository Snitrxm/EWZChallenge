import express from 'express'
import mongoose from 'mongoose';
import router from './routes';

const app = express();

app.use(express.json())
app.use(router)


mongoose.connect('mongodb+srv://snitram:andrerocha3@cluster0.2dh4w.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection failed');
})



app.listen(3000, () => console.log(`App listening on port 3000!`))