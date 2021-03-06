var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'akbarjamal',
    database: 'akbarjamal',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'SomeRandomText',
    cookie: { maxAge : 1000 * 60 * 60 * 24 * 30}
}));

var season = {
  '06-07': {
    title:'Season 06-07 Review:',
    link:"<a href='https://en.wikipedia.org/wiki/2006%E2%80%9307_Manchester_United_F.C._season' target='_blank'>Wiki link</a>",
    content:`
        <p>
                The 2006-07 season was Manchester United's 15th season in the Premier League, and their 32nd consecutive season in the top division of English football. United enjoyed a much more successful season than the previous three seasons, winning the Premier League by a six-point margin over Chelsea. They also reached the final of the FA Cup and the semi-finals of the UEFA Champions League, losing to Chelsea and Milan respectively. However, for all their success in the major competitions, the club was unable to defend the League Cup title they had won in 2005-06, losing to Southend United in the Fourth Round.</p>
        <p>
                Manchester United were not only dominant on a team level in 2006-07, but also on an individual level, with eight United players earning spots in the PFA Team of the Year, as well as Cristiano Ronaldo picking up no less than eight individual awards for his performances over the season and Sir Alex Ferguson winning the Premier League's Manager of the Season award.</p>
        <p>
                The 2006-07 season also marked the 50th anniversary of the Busby Babes' first foray into European competition. The event was marked by a charity football match, organised in collaboration with UEFA, who were commemorating 50 years since the signing of the Treaty of Rome, against a team of the best players from Europe's top clubs.</p>`,
      video:'<iframe width="560" height="315" src="https://www.youtube.com/embed/zoG-xJOu1no" frameborder="0" allowfullscreen></iframe>'},
  '07-08': {
    title:'Season 07-08 Review:',
    link:"<a href='https://en.wikipedia.org/wiki/2007%E2%80%9308_Manchester_United_F.C._season' target='_blank'>Wiki link</a>",
    content:`
        <p>
                The 2007-08 season was Manchester United's 16th season in the Premier League, and their 33rd consecutive season in the top division of English football. The season was regarded as a success; despite the team's slow start in the league, they won their 10th Premier League title (their 17th top division title overall, just one behind Liverpool's record of 18) and beat Chelsea on penalties in the 2008 UEFA Champions League Final to claim the European Double.</p>
            <p>
                Although they won the 2007 FA Community Shield against Chelsea, the club was not as successful in the domestic cup competitions, losing to eventual FA Cup winners, Portsmouth, in the Sixth Round, and losing to Coventry City in the Third Round of the League Cup.</p>
        <p>
                In February 2008, the club commemorated the 50th anniversary of the Munich air disaster, as a result of which eight United players and three members of the coaching staff lost their lives. The club held a memorial service at Old Trafford on 6 February 2008, renaming the tunnel under the South Stand as the "Munich Tunnel". This was followed on 10 February by the Manchester derby. United took to the field in a retro kit reminiscent of the kit worn by the 1958 team, abandoning squad numbers in favour of a 1-11 numbering system.</p>
            <p>
              United's players were also successful on an individual level in the 2007-08 season, with three players in the PFA Premier League Team of the Year, while Cristiano Ronaldo picked up six individual awards, including the Premier League Golden Boot for his 31 league goals.</p>`,
        video:'<iframe width="560" height="315" src="https://www.youtube.com/embed/dL5x5vp9Qgc" frameborder="0" allowfullscreen></iframe>' },
  '08-09': {
    title:'Season 08-09 Review:',
    link:"<a href='https://en.wikipedia.org/wiki/2008%E2%80%9309_Manchester_United_F.C._season' target='_blank'>Wiki link</a>",
    content:`
        <p>
                The 2008-09 season was Manchester United's 17th season in the Premier League, and their 34th consecutive season in the top division of English football. After winning a third consecutive Premier League title for the second time to equal Liverpool's record of 18 league titles, the team aimed to become the first team to retain the European Cup since Milan in 1990. However, they were beaten 2â0 by Barcelona in the final at the Stadio Olimpico in Rome on 27 May 2009.</p>
        <p>
                United started their season in August 2008 by winning the Community Shield. In December 2008, the club became the first English side to win the FIFA Club World Cup when they beat LDU Quito 1-0 in the final. Two months later, on 1 March 2009, the club added the 2008â09 League Cup to their trophy cabinet with a 4-1 penalty shootout win over Tottenham Hotspur after a goalless 120 minutes in the final.</p>
        <p>
                United secured a third consecutive Premier League with a goalless draw at home to Arsenal on 16 May 2009. This made them the first team ever to win three consecutive English top flight titles on two separate occasions, having previously done so between 1999 and 2001.</p>`,
        video:'<iframe width="560" height="315" src="https://www.youtube.com/embed/1EFAqVq0DCQ" frameborder="0" allowfullscreen></iframe>'}};

function createTemplate(data) {
  var title = data.title;
  var link = data.link;
  var content = data.content;
  var video = data.video;
  var htmlTemplate = `
            <!doctype html>
            <html>
              <head>
                <title> ${title} </title>
                  <link href='/ui/review.css' rel='stylesheet'/>
                  <link rel="icon" href="/ui/crest.png" type="image/png" /> 
                  <meta name='viewport' content='width=device-width, initial-scale=1'>
              </head>
              <body>
                  ${link}
                  <a href='/' style='padding-left:10px;'>Home</a>
                  <h1> ${title} </h1>
                  <div>
                    ${content}
                  </div>
                  <hr/>
                  <div>
                    ${video}
                  </div>
              </body>
            </html>`;
  return htmlTemplate;}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'using-hash-function');
    res.send(hashedString);
});

app.post('/create-user', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    console.log(username, password, salt);
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send('Username succesfully created: ' + username);
        }
    });
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        }
        else {
            if(result.rows.length === 0) {
                res.status(403).send('Username or password is invalid');
            }
            else {
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword === dbString) {
                    req.session.auth = {userId : result.rows[0].id};
                    res.send('Credentials are correct!');
                } else {
                    res.status(403).send('Wrong Credentials');
                }
            }
        }
    });
});

app.get('/check-login', function (req,res) {
    if(req.session && req.session.auth && req.session.auth.userId) {
        res.send('You are logged in: ' + req.session.auth.userId.toString());
    } else {
        res.send('You are not logged in');
    }
});

app.get('/logout', function (req, res) {
    delete req.session.auth;
    res.send('Logged out!!');
});
var pool = new Pool(config);

app.get('/test', function (req,res) {
    pool.query('SELECT * FROM test', function (err,result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    }); 
});

var counter = 0;
app.get('/yes', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString()) ;
});

var names = [];
app.get('/submit-name', function (req,res) {
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/season/:year', function (req, res) {
  pool.query("SELECT * FROM season WHERE id = $1", [req.params.year], function (err, result) {
      if(err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length === 0) {
              res.status(404).send('Data not available');
          } else {
              var Data = result.rows[0];
              res.send(createTemplate(Data));
          }
      }
  });
});

app.get('/:year', function (req, res) {
  var year = req.params.year;
  res.send(createTemplate(season[year]));
});

app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/ui/bio.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bio.html'));
});

app.get('/ui/feedback.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'feedback.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/review.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'review.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/crest.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'crest.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
