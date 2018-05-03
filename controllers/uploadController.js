module.exports = function(express, app, fileUpload) {
    app.get("/upload", function(req, res) {
        res.render("fileUpload");
    });

    app.post("/upload", function(req, res) {
        if(!req.files) {
            return res.status(400).send("No files were uploaded");
        }

        let sampleFile = req.files.pic;
        console.log(sampleFile.name);
        sendFile.mv("somewhere/on/the/server/filename.jpg",function(err) {
            if(err) { return res.status(500).send(err); }
            res.send("File has been uploaded!");
        });
    });
};