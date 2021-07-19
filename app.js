const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let newItems = [];
let workItems = [];

app.get("/", function (req, res) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  today = today.toLocaleDateString("en-us", options);
  res.render("list", { listTitle: today, listItems: newItems });
});
app.post("/", function (req, res) {
  let newItem = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    newItems.push(newItem);
    res.redirect("/");
  }
});
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", listItems: workItems });
});
app.get("/about" , function(req,res){
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
