const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  time: String,
  rate_review: [String]
});

const User = mongoose.model("user", userSchema);
const Restaurant = mongoose.model("restaurant", restaurantSchema);

router.get('/get_name', function (req, res, next) {
    var return_id, return_name, return_email;
    console.log('GET 호출 / name : ' + req.query.name);
    console.log('path : ' + req.path);

    Restaurant.find({name: req.query.name}, function(err, notice_dt) {
      console.log(notice_dt[0].rate_review);

      for (let rate of notice_dt[0].rate_review) {
        console.log(rate);
      }
    });
});

router.post('/post_by_comment', function(req, res, next) {
  console.log(req.body.data);
  var comment_set_json = JSON.parse(req.body.data);
  var user_id = comment_set_json.id;
  console.log(user_id);
  var resName = comment_set_json.resName;
  console.log(resName);
  var user_rate = comment_set_json.rate;
  console.log(user_rate);
  var user_memo = comment_set_json.memo;
  console.log(user_memo);
  var res_rate_review;
  var flag;;

  var user_name, user_email;

  User.find({id: user_id}, function(err, notice_dt) {
    if (err) {
      console.log("comment, user find error");
    } else {
      if (notice_dt.length == 0) {
        console.log("comment no user found");
      } else {
        flag = 0;
        user_name = (notice_dt[0].name).toString();
        user_email = (notice_dt[0].email).toString();
        console.log(user_name);
        console.log(user_email);
        res_rate_review = "<id : " + user_id + ">, <rate : " + user_rate + ">, <memo : " + user_memo + ">, <name : " + user_name + ">, <email : " + user_email + ">";
        console.log(res_rate_review);
      }
    }
  });

  
  Restaurant.find({name: resName}, function(err, notice_dt) {
    if (err) {
      console.log("res find error");
    } else {
      if (notice_dt.length == 0) {
        console.log("comment no restaurant found");
      } else {

        var id_exists = 0;

        for (let rate of notice_dt[0].rate_review) {
          console.log("tital rate: "+rate);
          var id = (rate.split(': '))[1];
          id = (id.split('>'))[0];
          console.log("id: "+id);

          var rate_1 = (rate.split(': '))[2];
          rate_1 = (rate_1.split('>'))[0];
          console.log("rate_1: "+rate_1);

          var review = (rate.split(': '))[3];
          review = (review.split('>'))[0];
          console.log("review: "+review);

          if (id == user_id) {
            id_exists = 1;
            console.log("id "+id+" already exists");
            Restaurant.updateOne(
              {name: resName},
              {$pull: { rate_review: rate }},
              function(err, result) {
                if (err) {
                  console.log("pull error");
                } else {
                  console.log("pull success");
                }
              }
            );
  
            Restaurant.updateOne(
              {name: resName},
              {$push: { rate_review: res_rate_review }},
              function(err, result) {
                if (err) {
                  console.log("push error");
                } else {
                  console.log("push success");
                }
              }
            );
          }
        }
        if (id_exists == 0) {
          Restaurant.updateOne(
            {name: resName},
            {$push: { rate_review: res_rate_review }},
            function(err, result) {
              if (err) {
                console.log("push error");
              } else {
                console.log("new id");
                console.log("push success");
              }
            }
          );
        }
      }
    }

    Restaurant.find({name: resName}, function(err, notice_dt) {
      console.log("send json!!");
      console.log("\n\n");
      var rate_review_set = "{\"res_name\": \"" + resName + "\", \"resList\": [";
      if (err) {
        res.send(err);
      } else {
        if (notice_dt.length == 0) {
          console.log("no restaurant found");
        } else {
          console.log("restaurant found");
          for (let rate of notice_dt[0].rate_review) {
            console.log(rate);
            var user_name = (rate.split(': '))[4];
            user_name = (user_name.split('>'))[0];
            console.log(user_name);
  
            var user_rate = (rate.split(': '))[2];
            user_rate = (user_rate.split('>'))[0];
            console.log(user_rate);
  
            var user_memo = (rate.split(': '))[3];
            user_memo = (user_memo.split('>'))[0];
            console.log(user_memo);
  
            var rate_review = "{\"name\": \"" + user_name + "\", \"rate\": " + user_rate + ", \"memo\": \"" + user_memo + "\"}, ";
            console.log(rate_review);
            rate_review_set = rate_review_set + rate_review;
            console.log(rate_review_set);
          }
          rate_review_set = rate_review_set.slice(0,-2);
          console.log("final: "+rate_review_set);
          //완성된 rate_set
          if (notice_dt[0].rate_review.length != 0) {
            rate_review_set = rate_review_set + "]}"
            console.log(rate_review_set);
          }
          console.log(JSON.parse(rate_review_set));
          res.send(rate_review_set.toString());
        }
      }
    });
  });
});

router.post('/post_by_json_user', function (req, res, next) {
  var inputData;
  inputData = JSON.parse(req.body.data);
  var newUsers = new User();
  newUsers.id = inputData.id;
  newUsers.name = inputData.name;
  newUsers.email = inputData.email;
  console.log(inputData);

  User.find({id: newUsers.id}, function(err, notice_dt) {
    if (err) {
      res.send(err);
    } else {
      if (notice_dt.length == 0) {
        console.log("no user found, add user");

        newUsers.save((err) => {
            if (err) throw err;
            console.log("Add Success!");
            res.send("post success");
        });
        console.log('id : ' + inputData.id);
        console.log('name : ' + inputData.name);
        console.log('email : ' + inputData.email);
        console.log('path : ' + req.path);
      } else {
        console.log("user already exists");
        return_id = notice_dt[0].id;
        return_name = notice_dt[0].name;
        return_email = notice_dt[0].email;
        console.log("return_id: "+return_id);
        console.log("return_name: "+return_name);
        console.log("return_email: "+return_email);
        res.send("user found: id_"+return_id+"\n name_"+return_name+"\n email_"+return_email);
      }
    }
  });
});

router.post('/post_by_resName', function(req, res, next) {
  console.log(req.body.data);
  var res_name = req.body.data;
  var user_name, user_rate, user_review;
  var name_rate_review;
  var name_rate_review_set;
  console.log(name_rate_review_set);

  Restaurant.find({name: res_name}, function(err, notice_dt) {
    name_rate_review_set = "{\"res_name\": \"" + res_name + "\", \"resList\": [";
    if (err) {
      res.send(err);
    } else {
      if (notice_dt.length == 0) {
        console.log("no restaurant found");
      } else {
        console.log("restaurant found");
          for (let rate of notice_dt[0].rate_review) {
            console.log(rate);
            user_name = (rate.split(': '))[4];
            user_name = (user_name.split('>'))[0];
            console.log(user_name);

            user_rate = (rate.split(': '))[2];
            user_rate = (user_rate.split('>'))[0];
            console.log(user_rate);

            user_review = (rate.split(': '))[3];
            user_review = (user_review.split('>'))[0];
            console.log(user_review);
            name_rate_review = "{\"name\": \"" + user_name + "\", \"rate\": " + user_rate + ", \"review\": \"" + user_review + "\"}, ";
            console.log(name_rate_review);
            name_rate_review_set = name_rate_review_set + name_rate_review;
            console.log(name_rate_review_set);
          }
          if (notice_dt[0].rate_review.length != 0) {
            name_rate_review_set = name_rate_review_set.slice(0,-2);
            console.log(name_rate_review_set);
          }
          //완성된 rate_set
          name_rate_review_set = name_rate_review_set + "]}"
          console.log(name_rate_review_set);
          console.log(JSON.parse(name_rate_review_set));
          res.send(name_rate_review_set.toString());
      }
    }
  });
});

router.put('/restaurant_rate_review/:restaurant_name', function (req, res, next) {

  res_name = req.params.restaurant_name; // res_name: string
  var get_rate_review = req.body.rate_review; // res_rate: string
  var get_id, get_rate, get_review;
  var user_name, user_email;
  var res_rate_review;

  get_id = (get_rate_review.split(': '))[1];
  get_id = (get_id.split('>'))[0];
  console.log(get_id);

  get_rate = (get_rate_review.split(': '))[2];
  get_rate = (get_rate.split('>'))[0];
  console.log(get_rate);

  get_review = (get_rate_review.split(': '))[3];
  get_review = (get_review.split('>'))[0];
  console.log(get_review);

  User.find({id: get_id}, function(err, notice_dt) {
    if (err) {
      console.log("user fine error");
    } else {
      if (notice_dt.length == 0) {
        console.log("no user found");
      } else {
        user_name = (notice_dt[0].name).toString();
        user_email = (notice_dt[0].email).toString();
        console.log(user_name);
        console.log(user_email);
        res_rate_review = get_rate_review + ", <name : " + user_name + ">, " + "<email : " + user_email + ">";
        console.log(res_rate_review);
      }
    }
  });

  Restaurant.find({name: res_name}, function(err, notice_dt) {
    if (err) {
      console.log("error");
    } else {
      if (notice_dt.length == 0) {
        console.log("no restaurant found");
      } else {
        console.log("res_name: "+notice_dt[0].name);
        console.log("res_location: "+notice_dt[0].location);
        console.log("res_time: "+notice_dt[0].time);
        console.log(notice_dt[0].rate_review);
      }

      var id_exists = 0;

      for (let rate of notice_dt[0].rate_review) {
        var id = (rate.split(': '))[1];
        id = (id.split('>'))[0];
        console.log(id);

        var rate_1 = (rate.split(': '))[2];
        rate_1 = (rate_1.split('>'))[0];
        console.log(rate_1);

        var review = (rate.split(': '))[3];
        review = (review.split('>'))[0];
        console.log(review);

        if (id == get_id) {
          var id_exists = 1;
          console.log("id "+id+" already exists");
          Restaurant.updateOne(
            {name: res_name},
            {$pull: { rate_review: rate }},
            function(err, result) {
              if (err) {
                console.log("pull error");
              } else {
                console.log("pull success");
              }
            }
          );

          Restaurant.updateOne(
            {name: res_name},
            {$push: { rate_review: res_rate_review }},
            function(err, result) {
              if (err) {
                console.log("push error");
              } else {
                console.log("push success");
              }
            }
          );
        }
      }
      if (id_exists == 0) {
        Restaurant.updateOne(
          {name: res_name},
          {$push: { rate_review: res_rate_review }},
          function(err, result) {
            if (err) {
              console.log("push error");
            } else {
              console.log("push success");
            }
          }
        );
      }
    }
  });

  /*
  var res_rate_json, res_rate_real_json;
  var res_name, res_location, res_time, res_rate;
  var userid_rate;
  var rate_array;
  var newRestaurants = new Restaurant();
  var rate_string;
  var user_id_1, user_id_2;
  var user_id, user_rate, user_review;

  res_name = req.params.restaurant_name; // res_name: string
  console.log(res_name);
  res_rate_json = req.body.rate_json; // res_rate_json: string
  res_rate_real_json = JSON.parse(res_rate_json); // res_rate_real_json: json
  user_id = res_rate_real_json.id;
  console.log(user_id);
  user_rate = res_rate_real_json.rate;
  console.log(user_rate);
  user_review = res_rate_real_json.review;
  console.log(user_review);
  console.log(res_rate_json);
  console.log(res_rate_real_json);
  user_id_1 = (res_rate_json.split(':'))[1];
  user_id_1 = (user_id_1.split(',')[0]).slice(1, -1);
  console.log(user_id_1); //user_id_1[1] --> name

  Restaurant.find({name : res_name}, function(err, notice_dt) {
    if (err) {
      res.send(err);
    } else {
      if (notice_dt.length == 0) {
        console.log("no restaurant found");
      } else {
        console.log("res_name: "+notice_dt[0].name);
        console.log("res_location: "+notice_dt[0].location);
        console.log("res_time: "+notice_dt[0].time);
        console.log(notice_dt[0].rate_review[0]);
        
        const updatedRestaurant = Restaurant.updateOne(
          {name: res_name},
          {$push: { rate_review: {"id":"ayofine14", "rate":4, "review":"baaad"}}},
          function(err, result) {
            if (err) {
              console.log("error");
            } else {
              console.log("success");
            }
          }
        );
        /*
        for (let rate of notice_dt[0].rate_review) {
          rate_string = rate.toString();
          var first_split_1 = (rate_string.split(','))[1];
          var first_split_2 = (rate_string.split(','))[2];
          var first_split_3 = (rate_string.split(','))[3];
          var id = first_split_1.slice(3, -1);
          var rate_1 = first_split_2.substr(3);
          var review = first_split_3.slice(3,-3);
          id = (id.split(": '"))[1];
          rate_1 = (rate_1.split(": "))[1];
          review = (review.split(": '"))[1];
          console.log(id);
          console.log(rate_1);
          console.log(review);
          console.log("\n");
          var second_split = (first_split_1.split(': '))[1];
          console.log(user_id_1);
          console.log(second_split);
          var send = {id: "ayofine14", rate: 4, review: "bad"};
          if ('\''+user_id_1+'\'' == second_split) {
            var new_rate = "{\"id\": \"" + id + "\", \"rate\": " + user_rate + ", \"review\": \"" + review + "\"}";
            var new_rate2 = "{ id: \'" + id + "\', rate: " + user_rate + ", review: \'" + review + "\' }";
            console.log(new_rate);
            console.log(new_rate2);
            console.log(JSON.parse(new_rate));
            console.log("drop the beet");
            const updatedRestaurant = Restaurant.findOneAndUpdate(
              {name: res_name},
              {$push: { rate_review: ["yes"]}},
              function(err, result) {
                if (err) {
                  console.log("error");
                } else {
                  console.log(new_rate2);
                  console.log("success");
                }
              }
            );
            //console.log(updatedRestaurant);
          }
        }
      }
    }
  });
  */
  
  res.send('put success')
});

router.delete('/delete/:id', function (req, res, next) {
    console.log('DELETE 호출 / id : ' + req.params.id);
    console.log('path : ' + req.path);
    res.send('delete success')
});

module.exports = router;