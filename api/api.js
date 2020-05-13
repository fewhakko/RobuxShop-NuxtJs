import express, { response } from "express";
const router = express.Router();
var bodyParser = require('body-parser')
var crypto = require('crypto');
const axios = require('axios')
var date = new Date();
var mysql = require('mysql');


//Config Database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luastorevue'
});
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});


//RequireFile
var truewallet = require('./truewallet');
var robux = require('./robux');



const app = express();
app.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});


//FunctionTotal


function hashmd5(value) {
  var result = crypto.createHash('md5').update(value).digest("hex");
  var result1 = crypto.createHash('md5').update(result).digest("hex");
  var result2 = crypto.createHash('md5').update(result1).digest("hex");
  return result2;
}

function checktmpay(data) {
  if (data === 1) {
    return "บัตรเติมเงินถูกใช้ไปแล้ว";
  } else if (data === 3) {
    return "บัตรเติมเงินถูกใช้ไปแล้ว";
  } else if (data === 4) {
    return "รหัสบัตรเติมเงินสดไม่ถูกต้อง";
  } else if (data === 5) {
    return "เป็นบัตรทรูมูฟไม่ใช่บัตรทรูมันนี่";
  } else if (data === 0) {
    return "กำลังตรวจสอบบัตรกรุณารอสักครู่.";
  }
}

function checknumber(stringz) {
  if (stringz.search(/[^0-9]/) !== -1) {
    return 'false';
  }
  else {
    return 'true';
  }
}


//RouterApiTotal
router.get("/tmpayrequestfew", (req, res) => {
  try {

    var transaction_id = req.query.transaction_id;
    var password = req.query.password;
    var real_amount = req.query.real_amount;
    var status = req.query.status;

    if (status === "1") {
      connection.query('SELECT * FROM tmpay WHERE password = ?', [password], function (error, results, fields) {
        if (results.length > 0) {
          if (real_amount === "50.00") {
            connection.query('UPDATE users SET point = point + ?, totalpoint = totalpoint + ? WHERE username = ?', ["43", "43", results[0].username]);
          } else if (real_amount === "90.00") {
            connection.query('UPDATE users SET point = point + ?, totalpoint = totalpoint + ? WHERE username = ?', ["77", "77", results[0].username]);
          } else if (real_amount === "150.00") {
            connection.query('UPDATE users SET point = point + ?, totalpoint = totalpoint + ? WHERE username = ?', ["128", "128", results[0].username]);
          } else if (real_amount === "300.00") {
            connection.query('UPDATE users SET point = point + ?, totalpoint = totalpoint + ? WHERE username = ?', ["257", "257", results[0].username]);
          } else if (real_amount === "500.00") {
            connection.query('UPDATE users SET point = point + ?, totalpoint = totalpoint + ? WHERE username = ?', ["428", "428", results[0].username]);
          } else if (real_amount === "1000.00") {
            connection.query('UPDATE users SET point = point + ?, totalpoint = totalpoint + ? WHERE username = ?', ["856", "856", results[0].username]);
          }
          connection.query('INSERT INTO topup (username,password,amount,date,type) VALUES (?,?,?,?,?)', [results[0].username, password, real_amount, date.getTime(), "2"]);
        }
      });
    }

    connection.query('UPDATE tmpay SET status = ?, real_amount = ? WHERE password = ?', [status, real_amount, password]);
    return res.json({ status: "error", message: real_amount });
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});

router.get("/truewalletcronz", async (req, res) => {
  var few = await truewallet.getTransactions(20);
  for (var i = 0; i < few.data.activities.length; i++) {
    var reportid = few.data.activities[i].report_id;
    var fewza = await truewallet.GetTransactionReport(reportid);
    var transcation = fewza.data.section4.column2.cell1.value;
    var money = fewza.data.section3.column1.cell2.value;

    connection.query('SELECT * FROM wallet WHERE transactions = ?', [transcation], function (error, results, fields) {
      if (!results.length > 0) {
        connection.query('INSERT INTO wallet (transactions,money) VALUES (?,?)', [transcation, money]);
      }
    });
    console.log(fewza.data.section3.column1.cell2)
  }
  return res.json({ status: "success" });
});

router.get("/getallusers", (req, res) => {
  try {
    var rank = req.session.fewrank.rank;

    if (rank === 2) {
      connection.query('SELECT * FROM users', function (error, results, fields) {
        if (results.length > 0) {
          return res.json(results);
        } else {
          return res.json({ status: "error", message: "ไม่มีผู้ใช้" });
        }
      });
    } else {
      return res.json({ status: "error", message: "มึงไม่มียสแอดมินไอสัส" });
    }
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});

router.get("/robuxcheck", async (req, res) => {
  try {
    connection.query('SELECT * FROM robuxset', async function (error, results, fields) {
      if (results.length > 0) {
        var fewfew = await robux.currency(results[0].cookie, results[0].idgroup);
        console.log(fewfew)
        if (fewfew.robux) {
          var robux1 = fewfew.robux;
          return res.json({ rate: results[0].rate, link: "https://www.roblox.com/groups/" + results[0].idgroup, robux: robux1 });
        } else {
          return res.json({ rate: results[0].rate, link: "https://www.roblox.com/groups/" + results[0].idgroup, robux: "0" });
        }
      } else {
        return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
      }
    });
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});

router.get("/topusers", async (req, res) => {
  connection.query('SELECT * FROM robuxset', async function (error, results, fields) {
    if (results.length > 0) {
      var fewfew = await robux.currency(results[0].cookie, results[0].idgroup);
      if (fewfew.robux) {
        var robux1 = fewfew.robux;

        connection.query('SELECT * FROM users ORDER BY totalpoint DESC LIMIT 1', async function (error, results, fields) {
          if (results.length > 0) {
            return res.json({ top: results[0].username, robux: robux1 });
          }
        });
      } else {
        connection.query('SELECT * FROM users ORDER BY totalpoint DESC LIMIT 1', async function (error, results, fields) {
          if (results.length > 0) {
            return res.json({ top: results[0].username, robux: 0 });
          }
        });
      }
    } else {
      return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
    }
  });
});

router.post("/changepassword", (req, res) => {
  try {
    var username = req.session.authUser.username;

    var passwordold = req.body.passwordold;
    var passwordnew1 = req.body.passwordnew1;
    var passwordnew2 = req.body.passwordnew2;
    if (passwordold === "" || passwordnew1 === "" || passwordnew2 === "") {
      return res.json({ status: "error", message: "คุณกรอกข้อมูลไม่ครบ" });
    } else {
      connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (results.length > 0) {
          if (results[0].password === hashmd5(passwordold)) {
            if (passwordnew1 === passwordnew2) {
              connection.query('UPDATE users SET password = ? WHERE username = ?', [hashmd5(passwordnew2), username]);
              return res.json({ status: "success", message: "ท่านได้ทำการเปลี่ยนรหัสผ่านแล้ว." });
            } else {
              return res.json({ status: "error", message: "รหัสผ่านใหม่ของท่านไม่ตรงกัน." });
            }
          } else {
            return res.json({ status: "error", message: "ท่านกรอกรหัสผ่านเก่าไม่ถูกต้อง" });
          }
        } else {
          return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
        }
      });
    }
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});


router.post("/robuxchange", (req, res) => {
  try {
    var rank = req.session.fewrank.rank;
    var cookie = req.body.cookie;
    var idgroup = req.body.idgroup.toString();
    var rate = req.body.rate.toString();
    if (rank === 2) {
      if (cookie === "" || idgroup === "" || rate === "") {
        return res.json({ status: "error", message: "คุณกรอกข้อมูลไม่ครบ" });
      } else {

        connection.query('UPDATE robuxset SET cookie = ?, idgroup = ?, rate = ?', [cookie, idgroup, rate]);
        return res.json({ status: "success", message: "เปลี่ยนการตั้งค่าสำเร็จ." });

      }
    } else {
      return res.json({ status: "error", message: "มึงไม่มียสแอดมินไอสัส" });
    }
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});

router.get("/robuxset", (req, res) => {
  try {
    var rank = req.session.fewrank.rank;

    if (rank === 2) {
      connection.query('SELECT * FROM robuxset', function (error, results, fields) {
        if (results.length > 0) {
          return res.json(results);
        } else {
          return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
        }
      });
    } else {
      return res.json({ status: "error", message: "มึงไม่มียสแอดมินไอสัส" });
    }
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});

router.get("/users", (req, res) => {
  try {
    var username = req.session.authUser.username;

    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
      if (results.length > 0) {

        req.session.authUser = { username: results[0].username };
        req.session.authUser.point = results[0].point;
        req.session.authUser.email = results[0].email;
        req.session.authUser.totalpoint = results[0].totalpoint;

        return res.json({ status: "success", username: results[0].username, point: results[0].point, email: results[0].email, totalpoint: results[0].totalpoint });
      } else {
        return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
      }
    });
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});

router.post("/captcha", (req, res) => {
  req.session.authUser.captcha = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
  return res.json({ status: "success", message: req.session.authUser.captcha });
});

router.post("/buyrobux", (req, res) => {
  try {
    var username = req.body.username.toString();
    var money = req.body.money.toString();
    var captcha = req.body.captcha.toString();
    var usernameuse = req.session.authUser.username;

    if (username === "" || money === "" || captcha === "") {
      return res.json({ status: "error", message: "ท่านกรอกข้อมูลไม่ครบ." });
    } else {
      if (req.session.authUser.captcha == captcha) {

        delete req.session.authUser.captcha;

        if (checknumber(money) == 'true') {

          connection.query('SELECT * FROM users WHERE username = ?', [usernameuse], async function (error, results, fields) {
            if (results.length > 0) {

              if (results[0].point >= money) {

                connection.query('SELECT * FROM robuxset', async function (error, results, fields) {

                  var money1 = Math.floor(results[0].rate * money);

                  var few = await robux.currency(results[0].cookie, results[0].idgroup)
                  var few = few.robux;

                  if (few >= money1) {

                    var checkgroup = await robux.checkusergroup(username, results[0].cookie, results[0].idgroup);

                    if (checkgroup != "false") {
                      connection.query('UPDATE users SET point = point - ? WHERE username = ?', [money, usernameuse]);
                      connection.query('INSERT INTO logs (user,point,status,nameprice,date) VALUES (?,?,?,?,?)', [usernameuse, money, "1", money1 + " R$", date.getTime()]);

                      var fewaa = await robux.sendrobux(checkgroup, money1, results[0].cookie, results[0].idgroup);
                      return res.json({ status: "success", message: "คุณได้ทำการซื้อ Robux เป็นจำนวน " + money1 + " R$ แล้ว" });
                    } else {
                      return res.json({ status: "error", message: "คุณไม่ได้อยู่ในกลุ่ม Roblox." });
                    }
                  } else {
                    return res.json({ status: "error", message: "ของหมดเเล้ว รอเพิ่มของก่อนเเล้ว กลับมาเติมใหม่" });
                  }
                });
              } else {
                return res.json({ status: "error", message: "จำนวนพ้อยต์ของท่านมีไม่เพียงพอ" });
              }
            } else {
              return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
            }
          });
        } else {
          return res.json({ status: "error", message: "จำนวนเงินกรอกได้แค่ตัวเลขห้ามใส่จุดทศนิยม" });
        }
      } else {
        return res.json({ status: "error", message: "ท่านกรอกรหัสยืนยัน 4 หลักไม่ถูกต้อง" });
      }
    }
  } catch (error) {
    return res.json({ status: "error", message: "ระบบมีปัญหากรุณาติดต่อแอดมิน." });
  }
});

router.post("/truewallet", (req, res) => {
  try {
    var username = req.session.authUser.username;
    var truewallet = req.body.tran.toString();
    if (truewallet === "") {
      return res.json({ status: "error", message: "ท่านกรอกข้อมูลไม่ครบ" });
    } else {
      connection.query('SELECT * FROM wallet WHERE transactions = ?', [truewallet], function (error, results, fields) {
        if (results.length > 0) {

          if (results[0].status === 1) {
            return res.json({ status: "error", message: "เลขอ้างอิงถูกใช้ไปแล้ว" });
          } else {
            connection.query('UPDATE wallet SET status = ? WHERE id = ?', ["1", results[0].id]);
            var money = parseFloat(results[0].money.replace(/,/g, ''));
            console.log(money);
            connection.query('UPDATE users SET point = point + ?, totalpoint = totalpoint + ? WHERE username = ?', [money, money, username]);
            connection.query('INSERT INTO topup (username,password,amount,date,type) VALUES (?,?,?,?,?)', [username, truewallet, money, date.getTime(), "1"]);
            return res.json({ status: "success", message: "คุณได้เติมเงินมา : " + results[0].money + " บาท" });
          }
        } else {
          return res.json({ status: "error", message: "ไม่เจอเลขอ้างอิงในระบบ" });
        }
      });
    }
  } catch (err) {
    return res.json({ status: "error", message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
  }
});

router.post("/truemoney", (req, res) => {
  var username = req.session.authUser.username.toString();
  var truemoney = req.body.code.toString();
  //console.log(req.protocol + '://' + req.get('host') + '/api/tmpayrequestfew');
  connection.query('SELECT * FROM tmpay WHERE password = ?', [truemoney], function (error, results, fields) {

    if (results.length > 0) {
      return res.json({ status: "success", message: checktmpay(results[0].status) });
    } else {
      axios.get('https://www.tmpay.net/TPG/backend.php?merchant_id=FA19050812&password=' + truemoney + '&resp_url=' + req.protocol + '://' + req.get('host') + '/api/tmpayrequestfew').then(response => {
        console.log(response.data)
        var resdata = response.data.split("|");
        if (truemoney.length == 14) {
          if (resdata[0] == "SUCCEED") {
            connection.query('INSERT INTO tmpay (username,transaction_id,password) VALUES (?,?,?)', [username, resdata[1], truemoney]);
            return res.json({ status: "success", message: "ระบบกำลังเช็คบัตรทรูรอ 1-10 วินาทียอดเงินถึงจะเข้านะครับ" });
          } else {
            return res.json({ status: "error", message: "ระบบกำลังทำรายการอย่ากดเติมซ้ำ." });
          }
        } else {
          return res.json({ status: "error", message: "รหัสบัตรทรูของท่านไม่ใช่ 14 หลัก." });
        }
      })
    }
  });
});

router.post("/login", (req, res) => {
  var username = req.body.username.toString();
  var password1 = req.body.password.toString();

  var hashpassword = hashmd5(password1);

  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, hashpassword], function (error, results, fields) {
    try {
      if (results.length > 0) {
        req.session.authUser = { username: results[0].username, point: results[0].point };
        req.session.fewrank = { rank: results[0].rank };
        return res.json({ status: "success", message: "เข้าสู่ระบบสำเร็จ." });
      } else {
        return res.json({ status: "error", message: "ชื่อผู้ใช้หรือรหัสผ่านของท่านไม่ถูกต้อง" });
      }
    } catch (err) {
      return res.json({ status: "error", message: "ชื่อผู้ใช้หรือรหัสผ่านของท่านไม่ถูกต้อง" });
    }

  });
});

router.get("/totallogs/:method", (req, res) => {
  if (req.params.method == "1") {
    connection.query('SELECT * FROM topup ORDER BY id DESC LIMIT 5', async function (error, results, fields) {
      try {

        var data = {}
        data.table = []
        for (var i = 0; i < 5; i++) {
          var obj = {
            username: results[i].username,
            amount: results[i].amount
          }
          console.log(obj)
          data.table.push(obj)
        }
        return res.json(data.table);

      } catch (err) {
        return res.json({ status: "error", message: "ไม่มีคนเติมเงินเลยอะเศร้า." });
      }
    });
  } else if (req.params.method == "2") {
    connection.query('SELECT * FROM users ORDER BY totalpoint DESC LIMIT 5', async function (error, results, fields) {
      try {
        var data = {}
        data.table = []
        for (var i = 0; i < 5; i++) {
          var obj = {
            username: results[i].username,
            totalpoint: results[i].totalpoint
          }
          console.log(obj)
          data.table.push(obj)
        }
        return res.json(data.table);
      } catch (err) {
        return res.json({ status: "error", message: "ไม่มีคนเติมเงินเลยอะเศร้า." });
      }
    });
  } else if (req.params.method == "3") {
    connection.query('SELECT * FROM logs ORDER BY id DESC LIMIT 5', async function (error, results, fields) {
      try {
        var data = {}
        data.table = []
        for (var i = 0; i < results.length; i++) {
          var obj = {
            username: results[i].user,
            nameprice: results[i].nameprice
          }
          console.log(obj)
          data.table.push(obj)
        }
        return res.json(data.table);
      } catch (err) {
        return res.json({ status: "error", message: "ไม่มีคนเติมเงินเลยอะเศร้า." });
      }
    });
  }
});

router.get("/logsuser/:method", (req, res) => {
  var username = req.session.authUser.username;

  if (req.params.method == "1") {
    connection.query('SELECT * FROM logs WHERE user = ? ORDER BY id DESC LIMIT 50', [username], async function (error, results, fields) {
      try {
        if (results.length > 0) {

          return res.json(results);

        } else {
          return res.json({ status: "error", message: "ไม่มีประวัติการซื้อสินค้า" });
        }
      } catch (err) {
        return res.json({ status: "error", message: "ชื่อผู้ใช้หรือรหัสผ่านของท่านไม่ถูกต้อง" });
      }
    });

  } else if (req.params.method == "2") {
    connection.query('SELECT * FROM topup WHERE username = ? ORDER BY id DESC LIMIT 50', [username], async function (error, results, fields) {
      try {
        if (results.length > 0) {
          return res.json(results);
        } else {
          return res.json({ status: "error", message: "ไม่มีประวัติการซื้อสินค้า" });
        }
      } catch (err) {
        return res.json({ status: "error", message: "ชื่อผู้ใช้หรือรหัสผ่านของท่านไม่ถูกต้อง" });
      }
    });
  }
});

router.post("/register", (req, res) => {

  var username = req.body.username.toString();
  var password1 = req.body.password1.toString();
  var password2 = req.body.password2.toString();
  var email = req.body.email.toString();

  if (username === "" || password1 === "" || password2 === "" || email === "") {

    return res.json({ status: "error", message: "ท่านกรอกข้อมูลไม่ครบ" });

  } else {
    if (password1 === password2) {
      var hashpassword = hashmd5(password1);
      connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (results.length > 0) {
          return res.json({ status: "error", message: "มีชื่อผู้ใช้นี้อยู่ในระบบแล้ว." });
        } else {
          connection.query('INSERT INTO users (username,password,email) VALUES (?,?,?)', [username, hashpassword, email], function (error, results, fields) {
            return res.json({ status: "success", message: "ท่านได้ทำการสมัครสมาชิกแล้ว" });
          });
        }
      });
    } else {
      return res.json({ status: "error", message: "รหัสผ่านของท่านไม่ตรงกัน" });
    }
  }
});

router.post("/logout", (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
});

export default {
  path: "/api",
  handler: router
};
