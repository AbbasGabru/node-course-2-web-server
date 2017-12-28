const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

//const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');


hbs.registerHelper('getCurrentYear', ()=> {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now} ${req.method} ${req.originalUrl}`;
	console.log(log);
	fs.appendFileSync('server.log',log+'\n');
	next();
});


// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs'); 	
// })
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
	//res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name:'Abbas',
	// 	likes:[
	// 		'Biking',
	// 		'Cities'
	// 	]
	// });
	res.render('home.hbs',{
		pageTitle:'Home Page',
		currentYear:new Date().getFullYear(),
		homePara:"I'm in home page"
	})
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
		currentYear:new Date().getFullYear()
	})
});

app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pageTitle:'Projects Page',
		pageMessage:'Portfolio page here..'
	});
})

// create route with /bad and output as json with errorMessage

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'Unable to handle request'
	});
})

app.listen(3000,()=>{
	//console.log(`Server is up on port ${port}`);
});