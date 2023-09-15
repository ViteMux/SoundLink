const express = require("express");
const router = express.Router();
const playlistModel = require("./../model/playlist.model")

const PARTIAL_CONTENT_HEADER = "Partial-Content";
router.get("/", (req, res) => {
    if (req.get(PARTIAL_CONTENT_HEADER) === "1") {
        res.render("page/home");
        return;
    }
    res.render("index", {
        contentUrl: ""
    });
})

router.get("/plan", (req, res) => {
    if (req.get(PARTIAL_CONTENT_HEADER) === "1") {
        res.render("page/plan");
        return;
    }
    res.render("index", {
        contentUrl: "/plan"
    })
})

router.get("/playlist/:id", async (req, res) => {
    var id = req.params.id;
    if (req.get(PARTIAL_CONTENT_HEADER) === "1") {
        var playlist = await playlistModel.findPlaylistById(id);
        var audioList = await playlistModel.getAudiosInPlaylist(playlist);
        res.render("page/playlist", {
            playlist: playlist, audioList: audioList
        });
        return;
    }
    res.render("index", {
        contentUrl: "/playlist/" + id
    })
})

router.get("/about", (req, res) => {
    if (req.get(PARTIAL_CONTENT_HEADER) === "1") {
        res.render("page/about");
        return;
    }
    res.render("index", {
        contentUrl: "/about"
    })
})


module.exports = router;