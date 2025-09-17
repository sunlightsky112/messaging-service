import express from 'express';
import dotenv from 'dotenv';
import messageRoutes from './routes/message';

dotenv.config();
const app = express();
app.use(express.json());

app.use("/", messageRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});