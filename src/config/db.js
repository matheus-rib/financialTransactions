const mongoose = require('mongoose');
const dbUri = "mongodb+srv://admin:admin@financialtransacions-dkyqd.mongodb.net/test?retryWrites=true";

const connectDB = async () => {
    try{
        await mongoose.connect(dbUri, { useNewUrlParser: true });
        console.log('Database connected');
    }catch(err){
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;