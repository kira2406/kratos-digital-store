const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const sequelize = require('./config/sequelize_db');

dotenv.config()

const PORT = process.env.PORT | 3000

const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', authRoutes);

app.use('/', (req, res)=>{
    res.status(200).json({message: "Kratos backend initialized"})
});

// Sync database and start server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Error syncing database:', err);
});