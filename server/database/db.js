import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@wordsmith.3zg7mhy.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    }
    catch (err) {
        console.log('Error while connecting to database', err);
    }
}

export default Connection;