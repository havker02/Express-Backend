const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  fs.readdir("./files", function(err, files){
    res.render("home", {files:files})
  })
});

app.get("/files/:file", (req, res)=>{
  fs.readFile(`./files/${req.params.file}`, "utf-8", (err, data)=>{
    res.render("view", {filename:req.params.file, data})
  })
});

app.post("/create", (req, res)=>{
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.content, function(err){
    res.redirect("/")
  }) 
});

app.listen(3000, () => {
  console.log('Express server initialized');
});