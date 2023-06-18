import express, {json} from 'express'
import cors from 'cors'
import userRoutes from './Routes/userRoutes'
import questionRoutes from './Routes/questionRoutes'

const app=express()

app.use(cors())
app.use(express.json())// middleware

app.use('/users',userRoutes)
app.use('/questions',questionRoutes)

app.listen(4000, ()=>{
    console.log("Server Running...")
})