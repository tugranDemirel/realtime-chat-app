import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
    .then(() => {
      console.log('DB CONNECTION SUCCESSFULL')
    })
    .catch(e =>{
        console.log(e)
    })
const server = app.listen(process.env.PORT, () => {
    console.log('server starterd')
})

