var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

var track = "\
<script>\
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\
  ga('create', 'UA-67240366-1', 'auto');\
  ga('send', 'pageview');\
</script>";

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
	      <li class="active"><a href="https://ps.owosso.k12.mi.us/public/">Order your site!</a></li>
	    </ul>
	    <!-- Left Nav Section -->
	    <ul class="left">
	      <li><a href="/pricing">Pricing</a></li>
	      <li><a href="/about">About</a></li>
	    </ul>
	  </section>
	</nav>`;

var modals = `<div aria-hidden="true" aria-labelledby="firstModalTitle" class=
    "reveal-modal" data-reveal="" id="firstModal" role="dialog">
        <h2 id="firstModalTitle">So you want a website?</h2>
        <p>You made the right choice. How about you choose what you need? If
        you have any questions, don't hesitiate to shoot us an email!</p>
        <form method="post" action="/submitOrder" name="contact" id="contact">
            <div class="row">
                <div class="large-4 columns">
                    <label>Your name<input placeholder="John Doe" type="text" id="name"></label>
                </div>
                <div class="large-8 columns">
                    <label>Your email<input placeholder="username@example.com" type="text"  id="email"></label>
                </div>
            </div>
            <div class="row">
                <div class="large-12 columns">
                    <label>Are there any websites you really like the design
                    of? If so, put them here 
                    <textarea placeholder="example1.com, example2.com, etc."  id="inspiration"></textarea></label>
                </div>
            </div>
            <div class="row">
                <div class="large-12 columns">
                    <label>What do you want for your site? 
                    <textarea placeholder="Don't forget to put what you want your website to look like, what you want it to do, what your business does, that kind of thing. We'll email you if we have any questions!" rows="6"  id="message"></textarea></label>
                </div>
            </div><a aria-label="Close" class="close-reveal-modal">&#215;</a>
        </form>
        <div class="large-3 large-offset-9 text-center column">
            <button id="submit-btn"  class="radius large button">Send an email</a>
        </div>
    </div>
    <div aria-hidden="true" aria-labelledby="secondModalTitle" class="reveal-modal" data-reveal="" id="sucsessModal" role="dialog">
        <h2 id="secondModalTitle">Thanks!</h2>
        <p>We'll get back to you soon with a quote.</p><a aria-label="Close"
        class="close-reveal-modal">&#215;</a>
    </div><!-- Reveal Modals end -->`;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', tracking: track, nav_bar: nav, modals: modals});
});


router.get('/pricing', function(req, res, next) {
  res.render('pricing', { title: 'Express', tracking: track, nav_bar: nav, modals: modals});
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express', tracking: track, nav_bar: nav, modals: modals});
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express', tracking: track, nav_bar: nav, modals: modals});
});


var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

router.post('/submitOrder', function(req, res) {
    console.log("Message: " + req.body.message);

    res.end("complete");
});
/*
router.get('/submitOrder', function(req, res, next) {
  res.redirect('/');
});*/


module.exports = router;
