const User= require('../models/users');

async function handleUserSignup(req, res) {
  const { name,email, password } = req.body;
  await User.create({ name,email, password });
  return res.redirect("home");
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user=await User.findOne({ email, password });
    if(!user){
        return res.status(401).json({error:'Invalid email/password'});
    }
    return res.redirect("home");
  }

module.exports = { handleUserSignup,handleUserLogin };