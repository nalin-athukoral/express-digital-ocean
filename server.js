const { json } = require('express');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('hello world')

})

app.get('/hello', (req, res) => {

    res.json('hello')
})
const obj = [
    {
        id:0,
        name: "dasdsda",
        age: 12,
        foods:['sdas','dasdsa','dasdsa']
    },
    {
        id:1,
        name: 'dasdas',
        age:645
    }
]

app.use((req,res,next) =>{
   const star = Date.now();
    next();
    const end = Date.now() - star;
    console.log(`hello ${req.method} and ${req.url} and ${end}`)
})

app.use(express.json());

app.post('/newname', (req,res)=> {

   
    if (!req.body.name) {
        res.status(400).json({
            error: "your data not macthc with API end point "
        })
    }
    const newName = {
        name: req.body.name,
        id: obj.length,
        // age: req.body.age
    }
    obj.push(newName);
    res.json(newName)
})

app.get('/name', (req, res) => {
   
    res.send(obj)
})

app.get('/name/:id', (req,res) =>{
    const id = Number(req.params.id);
    const nam = obj[id];
    if (nam) {
        res.status(200).json(nam);
    } 
    else {
        res.status(404).json({
            Errpr:"Not found user on this iD"
        })
    }
   
})

app.listen(3000, () => (
    console.log('port open')
))