const express = require("express");
const app = express();
const port = 3000;
let post = require("./Data/posts");
app.use(express.json());

let posts = [
  {
    id: "1",
    title: "aha",
    views: 100,
  },
  {
    id: "2",
    title: "another title",
    views: 200,
  },
  {
    id: "3",
    title: "another heeh",
    views: 250,
  },
];

app.get("/", (req, res) => {



  if (req.query.title) {
    let Newpost = posts.filter(p => p.title.required(req.query.title));
    res.send(Newpost);
  } else {
    res.send(posts);
  }


});


let rd=['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%$#@!'];
let random = rd[Math.floor(Math.random()*rd.length)];

app.post("/", (req, res) => {
  
  posts.push(req.body);
  res.status(200).send(req.body);
});

app.put("/:id", (req, res) => {
  let id = req.params.id;
  let post = posts.find((p) => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.views = req.body.views;
    res.status(200).send(post);
  } else {
    res.status(404).send({
      message: "id khong hop le",
    });
  }
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;
  let index = posts.findIndex((p) => p.id == id);
  if (index!== -1) {
    posts.splice(index, 1);
    res.status(200).send({
      message: "Xoa thanh cong",
    });
  } else {
    res.status(404).send({
      message: "id khong hop le",
    });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports =posts;