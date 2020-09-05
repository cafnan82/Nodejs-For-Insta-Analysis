var express = require("express");
var bud = require("basic-instagram-user-details");

var app = express();
var bodyParser = require("body-parser");

var url = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/ui.html");
});
app.listen(process.env.PORT || 8000, () => {
  console.log("listening to port 8000");
});
app.post("/getdetails", url, (req, res) => {
  var uid;
  var name;
  var nooffollowers;
  var nooffollowing;
  var noofposts;

  console.log(req.body.username);

  async function det() {
    await bud(req.body.username, "id").then((id) => {
      uid = id;
      console.log(uid);
    });
    await bud(req.body.username, "fullname").then((fullname) => {
      name = fullname;
      console.log(name);
    });
    await bud(req.body.username, "following").then((following) => {
      nooffollowing = following;
      console.log(nooffollowing);
    });
    await bud(req.body.username, "posts").then((posts) => {
      noofposts = posts;
      console.log(noofposts);
    });
    await bud(req.body.username, "followers").then((followers) => {
      nooffollowers = followers;
      console.log(nooffollowers);
    });

    function result() {
      var rst = {
        username: name,
        userid: uid,
        no_of_followers: nooffollowers,
        no_of_following: nooffollowing,
        no_of_posts: noofposts,
      };

      return res.send(rst);
    }
    result();
  }
  det();
});
