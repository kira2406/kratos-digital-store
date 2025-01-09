const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use('/api/', (req, res)=>{
    res.status(200).json({message: "Kratos backend initialized"})
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
