const authService = require("../services/authService");
const userService = require("../services/userService")

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await authService.registerUser(email, password);
    await userService.createUser(user?.uid, user?.email, username);

    const token = await user.getIdToken();
    res.status(201).json({ success: true, user: user?.uid, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    const token = await user.getIdToken();
    res.status(200).json({ success: true, token: token , user: user?.uid});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    await authService.logoutUser();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const result = await authService.verifyTokenService(token);
    return res.json(result);
  } catch (error) {
    return res.status(403).json({ valid: false, message: error.message });
  }

}

module.exports = { register, login, logout, verifyToken };
