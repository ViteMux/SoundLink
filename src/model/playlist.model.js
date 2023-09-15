const {
    MongoClient
} = require("mongodb");
const audioModel = require("./audio.model");
const uri = process.env.DB_HOST;
const client = new MongoClient(uri);

exports.getAudiosInPlaylist = async (playlist) => {
    const list = Array();
    for(audioId of playlist.audios) {
        const audio = await audioModel.findAudioById(audioId);
        list.push(audio);
    }
    return list;
}

exports.findPlaylistById = async (id) => {
    const db = client.db("Soundlink");
    const col = db.collection("Playlist");
    const promise = await col.findOne({
        _id: id
    });
    return promise;
}

// const schema = new mongoose.Schema({
//     id: String,
//     title: String,
//     uploder: String,
//     createdTime: {type: Date, default: Date.now},
//     audios: [],
//     meta: {
//         votes: Number
//     }
// });