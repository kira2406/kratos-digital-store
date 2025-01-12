const authService = require('../services/authService')

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password){
        return res.status(400).json({success:false, message: "All fields are required"})
    }
    try {
        const user = await authService.registerUser(username, email, password);
        return res.status(201).json({success:true, message: 'User registered successfully!', user})
        
    } catch (error) {
        console.error("Registration error", error);
        return res.status(500).json({success:false, message: error.message})
    }
}

const authController = {
    // Handle user register
    register: async (req, res) => {
        const {username, email, password} = req.body;

        if (!username || !email || !password){
            return res.status(400).json({success:false, message: "All fields are required"})
        }
        try {
            const user = await authService.registerUser(username, email, password);
            return res.status(201).json({success:true, message: 'User registered successfully!', user})
            
        } catch (error) {
            console.error("Registration error", error);
            return res.status(500).json({success:false, message: error.message})
        }
    },
    login: async (req, res) => {
        const {email, username, password} = req.body

        params = {
            email: email,
            username: username,
            password: password
        }

        if ((!email && !username) || !password){
            return res.status(400).json({success: false, message: 'Email/Username and password are required'})
        }

        try {
            const {user_id, token} = await authService.loginUser(params)
            res.status(200).cookie('Authorization','Bearer '+token, {
                expires: new Date(Date.now() + 8*3600000),
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            })
            .json({
                user_id: user_id,
                success:true,
                message: 'Login successful',
                token})
            
        } catch (error) {
            console.error('Login error', error)
            res.status(401).json({success:false, message: error.message})
            
        }
    }
}

module.exports = {authController, registerUser}