//Let  Quick start  with express handler goes here  

const  express   =  require('express')
const app =  express()
const port =  '3000'


app.get('/hello.txt' , function(req,  res ){

    res.send('Hello ')


})
app.listen(port ,function(){
    console.log("Port 3000  working ")
})