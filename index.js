const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./confige/mongoose');
const Contact= require('./models/contant');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware 1
// app.use(function(req, res, next) {
//   console.log("middleware  1 called");
//   next();
// });

// //middleware 2
// app.use(function(req, res, next) {
//     console.log("middleware  2 called");
//     next();
//   });

var contactList = [
    {
        name :"Suzel",
        phone :"123456789"
    },
    {
        name :"Sahil",
        phone :"123456789"
    },
    {
        name :"Arun",
        phone :"123456789"
    }
]

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){

            if(err){
                 console.log('Error in fetching contact');
                 return;
            }

            return res.render('home', {
                title:"My Contacts List",
                contact_list : contacts
            });
    })
    // return res.render('home', {
    //     title:"My Contacts List",
    //     contact_list : contactList
    // });
    // console.log(req);
    // console.log(__dirname);
    // res.send("<h1>Cool , it is  runing or !</h1>");
});

app.get('/delete-contact/', function(req, res){
    
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){

         if(err){
            console.log('error is delete');
            return;
         }

        return res.redirect('back');
    });
    
    // console.log(req.query);
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    //   if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    //   }

    //   return res.redirect('back');
});


app.get('/practice', function(req, res){

    return res.render('practice', {title:"Let us play with ejs"});
});


app.post('/create-contact', function(req, res){
 
 
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);
    Contact.create({
          name:req.body.name,
          phone : req.body.phone
    }, function(err, newContact){
         if(err){
            console.log('error in creating');
            return ;
         }

         console.log('*****', newContact);
         return res.redirect('back');
    });
    // return res.redirect('back');

    // return res.redirect('/');

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
        // return res.redirect('/practice');
});

app.listen(port, function(err){
    if(err){
        console.log("Error in runing the server",err);
    }

    console.log('my express server is runing', port);
});