const express = require("express")
var cors=require('cors')
const mongoose = require('mongoose')
const dotenv=require('dotenv')

const app=express()
const port=3000

app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())

dotenv.config("./env")
const db_password=process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://Subhadra:${db_password}@main.s1oiq.mongodb.net/?retryWrites=true&w=majority&appName=main`)
.then(res=>{
    console.log("DB connected successfully")
}).catch(err=>{
    console.log("DB connection failed")
})


let tasks=[
    {
        id:1,
        task:"Go to Shop"
    },
    {
        id:2,
        task:"Buy Biscuits"
    },
    {
        id:3,
        task:"Buy Chocolates"
    },
    {
        id:4,
        task:"Come Back"
    }
]
//Create a task
app.post("/",(req,res)=>{
    const task=req.body.task
    console.log(task)
    newtask= {id:tasks.length+1,task }
    tasks.push(newtask)
    res.json(tasks)
})
//Delete task
app.delete("/task/:index",(req,res)=>{
    console.log(req.params.index)
    if(req.params.index<tasks.length){
        tasks.splice(req.params.index,1)
        res.json(tasks)
    }else{
        res.status(404).json({"message":"invalid index"})
    }
})
//read task
app.get("/",(req,res)=>{
    res.json(tasks)
})
// Update - Update a to-do item by ID
app.put("/edit-task/:id",(req,res)=>{
    const id=req.params.id
    console.log(id)
    const taskData=req.body.task
    console.log(taskData)
    let task = tasks.find(t=>t.id===parseInt(id))
    console.log(task)
    task.task=taskData
    res.json(tasks)
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})