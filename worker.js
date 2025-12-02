const {Worker} = require("bullmq")
const Redis = require("ioredis")

const redisConnection = new Redis({
    host:"127.0.0.1",
    port:6379,
    maxRetriesPerRequest:null//required..
})
const worker = new Worker(
    "taskQueue",
    async(job)=>{
        console.log(`processing job for ${job.data.name}`)
        //time --5 sec
        await new Promise((resolve)=>setTimeout(resolve,10000))
        console.log(`job done for ${job.data.name}`)
    },
    {connection:redisConnection}
)