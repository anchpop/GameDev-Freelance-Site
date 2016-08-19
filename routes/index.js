var express = require('express');
var router = express.Router();

require('dotenv').config();
var mailgun = require('mailgun-js')({apiKey: process.env.mailgun_API_key, domain: process.env.mailgun_domain});


var track = `<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-82071438-2', 'auto');
  ga('send', 'pageview');

</script>`
;

var nav = `    <nav class="top-bar" data-topbar role="navigation">
	  <ul class="title-area">
	    <li class="name">
	      <h1><a href="/">SiteByte</a></h1>
	    </li>
	     <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
	    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
	  </ul>
	  <section class="top-bar-section">
	    <!-- Right Nav Section -->
	    <ul class="right">
	      <li><a href="/contact">Contact</a></li>
	      <li class="active"><a href="#order" data-reveal-id="firstModal" >Order your site!</a></li>
	    </ul>
	    <!-- Left Nav Section -->
	    <ul class="left">
	      <li><a href="/pricing">Pricing</a></li>
	      <li><a href="/about">About</a></li>
	    </ul>
	  </section>
	</nav>`;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', tracking: track, nav_bar: nav});
});


router.get('/pricing', function(req, res, next) {
  res.render('pricing', { title: 'Express', tracking: track, nav_bar: nav});
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express', tracking: track, nav_bar: nav});
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express', tracking: track, nav_bar: nav});
});


function email_test(email)
{
  var regex = new RegExp(`[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`, "i");
  return regex.test(email);
}



function addToMailingList(name, email, vars) {
  var members = [
    {
      address: name + " <" + email + '>',
      vars: vars
    },
  ];
   
  mailgun.lists(process.env.mailing_list).members().add({ members: members, subscribed: true }, function (err, body) {
    console.log(body);
  });
}

router.post('/submitOrder', function(req, res) {

    if (req.body.message != "" && req.body.name != "" && email_test(req.body.email))
    {
      addToMailingList(req.body.name, req.body.email, {placed_order: true})
      var data = {
        from: req.body.name + ' <' + req.body.email + '>',
        to: process.env.my_email + "," + process.env.zdawg_email,
        subject: 'Website for ' + req.body.name,
        text: req.body.message + "\n\n and some inspiration sites are: " + req.body.inspiration
      };

      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });

      res.end("complete");
    }
    else
      res.end("error of some sort");
});

router.post('/submitQuestion', function(req, res) {
    if (req.body.message != "" && req.body.name != "" && email_test(req.body.email))
    {
      addToMailingList(req.body.name, req.body.email, {placed_order: false})
      var data = {
        from: req.body.name + ' <' + req.body.email + '>',
        to: process.env.my_email,
        cc: process.env.zdawg_email,
        subject: 'Question from ' + req.body.name,
        text: req.body.message
      };

      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });

      res.end("complete");
    }
    else
      res.end("error of some sort");
});
/*
router.get('/submitOrder', function(req, res, next) {
  res.redirect('/');
});*/


module.exports = router;
