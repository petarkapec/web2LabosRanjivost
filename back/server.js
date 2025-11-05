const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(express.json());
app.use(express.static('public'));



app.use(cors());


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Dozvoljene metode
    credentials: false // Ako ne trebate slati cookies
}));

const data = {
    "data1" : "javna info 1",
    "data2" : "javna info 2"
}

const adminData = {
    "data1" : "povjerljiva informacija 1",
    "data2" : "povjerljiva informacija 2",
}

let zastita = 0;

app.post('/ukljuciZastita',
    (req, res) => {
        zastita = !zastita
        odgovor = "POST zahtjev obradjen zastita za accsess control je promjenjena na " + zastita
        res.send(odgovor)
    })

app.get("/data", (req, res) => {
  res.json(data);})


app.get("/adminData", (req, res) => {
  if (zastita) {
    res.status(401).json({ message: "RESTRICTED", error: "UNAUTHORIZED" });
  } else {
    res.json(adminData);
  }
});




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});