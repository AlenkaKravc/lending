const express = require('express');
const path = require('path');
const port = 3000;
const app = express();

// the __dirname is the current directory from where the script is running

app.use( express.static( `${__dirname}/../build` ) );


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


const listener = app.listen(port, () => {
    console.log(`Your app is listening on port ${listener.address().port}`)
});
