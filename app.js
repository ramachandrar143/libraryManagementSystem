
var express = require('express');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.use(session({
    secret: "Don't read me, This is a secret!",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
var con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "test"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected To database Test");
})
var port = 3000;
app.listen(process.env.PORT || port, function () {
    console.log("Library is at 127.0.0.1:" + port);
})
app.get('/staff', function (req, res) {
    console.log(req.session)
    if (req.session.staff) {
        console.log("Ok")
        res.sendFile(__dirname + '/staff/staff.html')
    }
    else {
        res.redirect('/#!/login');
    }
})
app.get('/Stafflogin', function (req, res) {
    console.log("***Welcome Staff***");
    res.sendFile(__dirname + '/index.html#!/staffLogin')
})

app.post('/staffLogin', function (req, res) {
    console.log(req.body)
    var query = "Select * from staff where staffId = '" + req.body.staffId + "'";
    console.log(query)
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            var data = JSON.parse(JSON.stringify(result))
            if (data[0].staffPwd == req.body.staffPwd) {
                console.log("sjd")
                req.session.staff = req.body.staffId
                console.log(req.session)
                // res.redirect('/staff');
                return res.json({ "msg": "s" });
            }
            else {
                return res.json({ "msg": "f" })
            }
        }
    })
})
app.post('/addBook', function (req, res) {
    console.log(JSON.stringify(req.body))
    var query = "INSERT into books(book,author,Stock,bookAccount,available) values('" + req.body.book + "','" + req.body.author + "','" + req.body.stock + "','" + req.body.number + "','" + req.body.stock + "')";
    con.query(query, function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ "msg": "error" })
        }
        else {
            console.log("inserted")
            return res.json({ "msg": "success" })
        }
    })
    console.log(query);
})

app.post('/searchBook', function (req, res) {
    console.log(JSON.stringify(req.body));
    var query = "select * from books where book = '" + req.body.keyword + "'";
    con.query(query, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            var data = JSON.parse(JSON.stringify(result))
            console.log(data)
            return res.json(data)
        }
    })

})
app.post('/searchAuthor', function (req, res) {
    console.log(JSON.stringify(req.body));
    var query = "select * from books where author = '" + req.body.keyword + "'";
    con.query(query, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            var data = JSON.parse(JSON.stringify(result))
            console.log(data)
            return res.json(data)
        }
    })
})
app.post('/searchNumber', function (req, res) {
    console.log(JSON.stringify(req.session));
    var query = "select * from books where bookAccount = '" + req.body.keyword + "'";
    con.query(query, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            var data = JSON.parse(JSON.stringify(result))
            console.log(data)
            return res.json(data)
        }
    })
})
app.post('/stuRegi', function (req, res) {
    console.log(req.body.dob)

    var date = (req.body.dob).substring(0, 10)
    console.log(date)
    var query = "insert into student(id,name,email,password,date,sex) values('" + req.body.id + "','" + req.body.name + "','" + req.body.emailid + "','" + req.body.pwd + "','" + date + "','" + req.body.gender + "')";
    con.query(query, function (err, data) {
        if (err) {
            console.log(err)
            return res.json({ msg: "f" })
        }
        else {
            console.log(data)
            return res.json({ msg: "s" })
        }
    })
})
app.post('/issueBooks', function (req, res) {
    console.log(req.session)
    var date = (req.body.date).substring(0, 10)
    console.log(date)
    var query = "insert into issue(id,bookAccount,date) values('" + req.body.id + "','" + req.body.bookAccount + "','" + date + "')";
    console.log(query)
    con.query(query, function (err, data) {
        if (err) {
            console.log(err)
            return res.json({ msg: "f" })
        } else {
            console.log(data)
            return res.json({ msg: "s" })
        }
    })
})
app.post('/returnBooks', function (req, res) {
    var query = "select * from issue where bookAccount= '" + req.body.number + "' and id= '" + req.body.id + "'";
    console.log(query)
    con.query(query, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
            if (Object.keys(data).length == 0) {
                console.log("No books found")
                return res.json({
                    "result": "402"
                })
            }
            else {
                var data = JSON.parse(JSON.stringify(data));

                return res.json(data)
            }
        }
    })
})

app.post('/confirmReturn', function (req, res) {

    console.log(req.body[0].id)
    var query = "delete from issue where id='" + req.body[0].id + "'and bookAccount='" + req.body[0].bookAccount + "'";
    console.log(query)
    con.query(query, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            var data = JSON.parse(JSON.stringify(data));

            console.log(data)

        }

    })
})






app.get('/student', function (req, res) {
    console.log(req.session)
    if (req.session.student) {
        console.log("Ok")
        res.sendFile(__dirname + '/student/student.html')
    }
    else {
        res.redirect('/studentLogin');
    }
})

app.post('/studentLogin', function (req, res) {
    console.log(req.body)
    var query = "Select * from student where id = '" + req.body.studentId + "'";
    console.log(query)
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            var data = JSON.parse(JSON.stringify(result))
            if (data[0].password == req.body.studentPwd) {
                console.log("auth completed")
                req.session.student = req.body.studentId
                console.log(req.session)
                //res.redirect('/student');
                return res.json({ "msg": "s" })
            }
            else {
                return res.json({ "msg": "f" })
            }
        }
    })
})

app.post('/getStudent', function (req, res) {
    console.log(req.session.student)
    var query = "select * from student where id = '" + req.session.student + "'";
    con.query(query, function (err, data) {
        console.log(data)
        var data = JSON.parse(JSON.stringify(data));
        return res.json(data)
    })
})
app.post('/getStudentBooks', function (req, res) {
    console.log(req.session.student)
    var query = "select * from issue where id = '" + req.session.student + "'";
    con.query(query, function (err, data) {
        console.log(data)

        var data = JSON.parse(JSON.stringify(data));
        return res.json(data)
    })

})