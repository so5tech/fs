import express from 'express';
import { ApiRouter } from './controllers/BO/apis';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cors from "./middlewares/cors";



const app = express();
const mongodb_uri:string = process.env.MONGODB_URI || "mongodb://localhost:27017/DB1"
mongoose.connect(mongodb_uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
// mongoose.connect('mongodb+srv://sourabhs:sourabhs@cluster0.fuw2xdu.mongodb.net/DB1', {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
// });

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());
app.use('/bo/apis', ApiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}  ${mongodb_uri}`);
});