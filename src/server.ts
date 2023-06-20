import express, {json} from 'express'
import cors from 'cors'
import userRoutes from './Routes/userRoutes'
import questionRoutes from './Routes/questionRoutes'
import answerRoutes from './Routes/answerRoutes'
import commentsRoutes from './Routes/commentsRoutes'
import votesRoutes from './Routes/votesRoutes'
import tagRoutes from './Routes/tagRoutes'

const app=express()

app.use(cors())
app.use(express.json())// middleware

app.use('/users',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/comments',commentsRoutes)
app.use('/votes',votesRoutes)
app.use('/tags',tagRoutes)

app.listen(4000, ()=>{
    console.log("Server Running...")
})