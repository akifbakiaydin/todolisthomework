const express = require('express');
const app = express();

const ejs = require('ejs');

const todo = require('./modals/todo');
 
const mongodb = require('mongoose');

mongodb.connect(process.env.MONGODB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

app.set("view engine", "ejs");
app.use(express.static('views/dist'));
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
    console.log('Sunucu başlatıldı! http://localhost:3000')
    app.get('/', (req, res) => {
        todo.find({}).then((list)=>{
            res.render('home.ejs',{list:list});
        })
    })

    app.post('/', (req,res)=>{
        const todolist = new todo(req.body);
        todolist.save();
        res.redirect('/');
    })

    app.get('/sil/:id' , (req,res)=>{

        todo.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/')
          })



    });
      
      
})

  