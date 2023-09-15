const {
    MongoClient
} = require("mongodb");
const uri = process.env.DB_HOST;
const client = new MongoClient(uri);

exports.findAudioById = async (id) => {
    const db = client.db("Soundlink");
    const col = db.collection("Audio");
    const re = await col.findOne({
        _id: id
    });
    console.log(re);
    return re;
}