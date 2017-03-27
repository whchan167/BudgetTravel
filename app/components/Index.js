var React = require("react");
var Router = require("react-router");

var Index = React.createClass({
	render:function(){
		return(
			<nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
        		<div class="container-fluid">   
            		<div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand page-scroll" id="siteNameLogo" href="#page-top"><span><img id="siteLogo" src="/assets/img/logo.png"> fanSTATStic</span></a>

   
             <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> 
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll" href="#about">About</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#howItWorks">How It Works</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#sports">Sports</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">Sign Up</a>
                    </li>
                </ul>
            </div> 
        </div> 
    </nav> 

    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1 id="homeHeading">Budget Travel</h1>
                <hr>
                <a href="#about" class="btn btn-primary btn-xl page-scroll">Find Out More</a>
            </div>
        </div>
    </header>
        )
	}
})