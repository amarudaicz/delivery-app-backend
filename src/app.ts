import 'dotenv/config'
import express from 'express'
import  cors from 'cors';
import { router } from './routes';
import bodyParser from 'body-parser';
import morgan from 'morgan'


const PORT = process.env.PORT || 3001
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))

app.use(router)










app.listen(PORT, () => {
    console.log('app on in' + PORT);
})



