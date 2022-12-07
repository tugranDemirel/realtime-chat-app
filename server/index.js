import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js'

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', userRoutes)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL,
    // error ları bastırmak için
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch(e =>{
        console.log(e)
    })

