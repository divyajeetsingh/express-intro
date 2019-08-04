var express = require('express'),
    exphbs = require('express-handlebars'); // "express-handlebars"



var firebase = require('firebase');
var appFirebase = firebase.initializeApp({

    apiKey: "xxxxxxxxxxx",
    authDomain: "xxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxx",
    projectId: "xxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxx",
    appId: "xxxxxxxxxxx"
});


var db = appFirebase.firestore();

var app = express();

// https://b19cafb3.ngrok.io/

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
const bodyparser = require('body-parser')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var dataFirebase = []
app.get('/', function (req, res) {


    // console.log(req)
    console.log(req.headers.host)
    // console.log(req.headers["proxy-authenticate"])
    // console.log(req.headers.location)

    // res.redirect("https://google.com")
    //Get  Firebase  Data Base  goes here

    // db.collection("users").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // });

    let hostUrlData = "https://" + req.headers.host
    if (hostUrlData) {
        console.log(hostUrlData, "host url data ")

        console.log("host url goes heree ")
        // db.collection('users').doc('exitingDomain').get().then( function (doc){
        //     console.log(doc ,"doc data ")
        // })



        var promise1 = new Promise(function (resolve, reject) {



            db.collection("users").where("exitingDomain", "==", hostUrlData)
                .get()
                .then(function (querySnapshot) {
                    // res.redirect('www.google.com')
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.exitingDomain, " => ", doc.data());
                        // dataFirebase.push(doc.data())
                        let upconmmingFirebaseData = doc.data()
                        console.log(upconmmingFirebaseData.redirectIpUrl, "upcomming")
                        //   return upconmmingFirebaseData.redirectIpUrl 
                        dataFirebase.push(doc.data())

                    })
                }).then(function (data) {

                    console.log("Promise goes here ", dataFirebase)
                    let i

                    for (i = 0; i < dataFirebase.length; i++) {

                        console.log(dataFirebase, "upcommingfirebaseGoees here ")
                        if (dataFirebase[i]['exitingDomain'] == hostUrlData) {
                            let redirect = dataFirebase[i]['redirectIpUrl']
                            console.log(redirect, "redirect===")
                            // res.setHeader('Authorization' , 'auth')


                            // google(res)

                            // res.status(301).redirect("https://www.google.com")

                            // res.redirect(redirect)
                            // window.location.href('https://google.com')
                            resolve(redirect)


                            //  break;



                        }



                    }
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });

        });

        promise1.then(function (value) {
            console.log(value, "valuesssssss", dataFirebase);
            // res.charset = 'utf-8'
            // res.header('cache-control', 'no-cache')
            // response.writeHead(200,{"context-type":"text/plain"});
            // res.status(301).redirect("https://www.google.com")

            if (dataFirebase.length != 0) {

                res.redirect('https://google.com')

            } else {
                res.render('home')
            }


            // expected output: "foo"
        });



        // db.collection('users').doc('exitingDomain').get().then( function(doc){
        //     console.log(doc.exists, "doc goess here ")
        // })

        //    console.log( dataMaping)
        //  db.collection("users").get().then((querySnapshot) => {

        //         querySnapshot.forEach((doc ) => {
        //             // console.log(index)
        //             console.log(`${doc.id} => ${doc.data()}`);
        //             dataFirebase.push(doc.data())
        //             console.log(dataFirebase)
        //         })
        //     });
        //    db.collection('users').get().where("redirectIpUrl", "!=", hostUrlData).get().then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });

        // res.render('home');
        // })
    }


    // //insert in database  using firebase goes here   ===
    // db.collection("users").add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });


    // db.collection('users').add({
    //     exitingDomain  :  
    //     redirectIpUrl:  
    //     isHttps : 
    // })

    // if(req.headers.host=='b19cafb3.ngrok.io'){

    //     // db.collection


    //     // window.open('https://gitsof.com')
    //     res.redirect('https://google.com')
    // }
});


function google(hostUrlData) {






    // res.redirect('https://google.com')

    // console.log("gooogle   testing  goes here  ===")
}
app.post('/', function (req, res) {
    console.log(req.body.edomain)
    console.log(req.body.url)
    console.log(req.body.ip)
    console.log(req.body.https)
    // document.getElementById('edomain')
    // alert("google")
    if (req.body.edomain && (req.body.url || req.body.ip)) {
        let urlIpData = req.body.url != undefined ? req.body.url : req.body.ip
        if (urlIpData) {
            if (req.body.https == 'on') {
                db.collection("users").add({
                    exitingDomain: req.body.edomain,
                    redirectIpUrl: urlIpData,
                    isHttps: true
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

            } else {
                db.collection("users").add({
                    exitingDomain: req.body.edomain,
                    redirectIpUrl: urlIpData,
                    isHttps: false
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            }


        } else {

            console.log("Please  File mandatory data ")
        }



    }
    res.render('home')
    // res.send("recieved your request!");
})

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});