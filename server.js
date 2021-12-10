import express, { static } from 'express'
const app = express()
import { json, urlencoded } from 'body-parser'
import { join } from 'path'	
import api from './server/routes/api'
import badges from './server/routes/bagdes'
import charts from './server/routes/charts'
import { connect } from 'mongoose'
connect(process.env.MONGODB_URI || "mongodb://localhost/crmDB", { useNewUrlParser: true })

app.use(json())
app.use(urlencoded({extended: false}))

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
//     next()
// })

app.use(static(join(__dirname, 'build')))
app.use('/', api)
app.use('/analytics/badges', badges)
app.use('/analytics/charts', charts)

const port = 1991

app.get('*', function (req, res) {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || port, function(){
    console.log('server is running')
})
