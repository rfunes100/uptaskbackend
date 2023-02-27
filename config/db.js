import mongoose from "mongoose"

const conectardb = async () => {
    try {
        mongoose.set('strictQuery', false)
        const db = await mongoose.connect(
            process.env.MONGO_URL,
           
            {
                useNewUrlParser: true ,
                useUnifiedTopology: true,

            }
            )

            const url = `${db.connecction}: ${db.connecction}`
        console.log('mongo db conectado', url)

    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)

        
    }
}

export default conectardb ; 
