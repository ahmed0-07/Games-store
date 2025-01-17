const User = require('../server/models/user');
const Game = require('../server/models/game');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const homePage = async (req, res) => {
    try{
        const data = await Game.find();
        res.render('./pages/home', { data });
    }
    catch(err){
        console.log(err);
    }
};

const search = async (req, res) => {
    try{
        const search = req.body.q;
        const searchNospecialchars = search.replace(/[^a-zA-Z0-9]/g, '');
        const data = await Game.find({
            $or: [
                {name: {$regex: new RegExp(searchNospecialchars, 'i')}}
            ]
        })
    
        res.render('./pages/home', { data });
    }
    catch(err){
        console.log(err);
    }
};

const signupPage = (req, res) => {
    res.render('./pages/sign-up');
};

const loginPage = (req, res) => {
    res.render('./pages/log-in');
};

const signup = async (req, res) => {
    try{
        const {username, password} = req.body;
        const exist = await User.findOne({username});
        if(exist){
            return res.json({message: 'already user'});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username: username, password: hashedPassword});
        await newUser.save();
        res.redirect('/login');
    }
    catch(err){
        console.log(err);
    }
};


const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json({message: 'user notfound'});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.json({message: 'not matched password'});
        }

        const token = jwt.sign({userID: user._id}, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        
        if(user.isAdmin){
            res.redirect('/admin/');
        }else{
            res.redirect('/user/');
        }
    }
    catch(err){
        console.log(err);
    }
};

const logout = (req, res) => {
    try{
        res.clearCookie('token');
        res.redirect('/');
    }
    catch(err){
        console.log(err);
    }
};

module.exports = { homePage, search, signupPage, loginPage, signup, login, logout};