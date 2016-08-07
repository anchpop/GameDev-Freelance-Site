var express = require('express');
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
	      <h1><a href="#">SiteByte</a></h1>
	    </li>
	     <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
	    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
	  </ul>
	  <section class="top-bar-section">
	    <!-- Right Nav Section -->
	    <ul class="right">
	      <li><a href="https://www.sendmoneytoschool.com/Dashboard/Login.aspx">Contact</a></li>
	      <li class="active"><a href="https://ps.owosso.k12.mi.us/public/">Order your site!</a></li>
	    </ul>
	    <!-- Left Nav Section -->
	    <ul class="left">
	      <li><a href="https://www.sendmoneytoschool.com/Dashboard/Login.aspx">Pricing</a></li>
	      <li><a href="https://www.sendmoneytoschool.com/Dashboard/Login.aspx">About</a></li>
	    </ul>
	  </section>
	</nav>`;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', tracking: track, nav_bar: nav, });
});

module.exports = router;
