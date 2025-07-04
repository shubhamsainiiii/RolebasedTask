const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();



require('dotenv').config();


// const corsOptions = {
//   origin: ["http://localhost:5173", "http://localhost:5174"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

app.use(cors());

app.use(express.json());

const router = require('./Router/superadmin.js');
app.use('/regex', router)
const routers = require('./Router/clientRoute.js');
app.use('/clients', routers)
const route = require('./Router/userRoute.js');
app.use('/users', route)
const course = require('./Router/courseRoute.js');
app.use('/course', course)
const batch = require('./Router/batchRoute.js');
app.use('/batch', batch)




const port = process.env.PORT || 8080;
const MONGOURL = process.env.MONGOURL

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("connected to mongo", MONGOURL);
    })
    .catch(() => {
        console.log("errro when connecting to mongo")
    })


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})