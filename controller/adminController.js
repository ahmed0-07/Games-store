const User = require('../server/models/user');
const Game = require('../server/models/game');
const jwt = require('jsonwebtoken');

const adminLayout = 'layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

const authMiddleWare = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        res.redirect('/');
    }

    try{
        const decode = jwt.verify(token, jwtSecret);
        const user = await findUserByToken(req);
        if(!user.isAdmin){
            return res.redirect('/');
        }
        req.userID = decode.userID;
        next();
    }
    catch(err){
        console.log(err);
    }
}

const findUserByToken = async (req) => {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findOne({ _id: decoded.userID });
    return user;
}

const adminHomePage = async (req, res) => {
    try{
        const data = await Game.find();
        res.render('./pages/admin-home', { data: data, layout: adminLayout});
    }
    catch(err){
        console.log(err);
    }
};

const removeGame = async (req, res) => {
    const id = req.params.id;

    await Game.deleteOne({ _id: id });
    res.redirect('/admin');
}

const addgamePage = (req, res) => {
    res.render('./pages/addgame', { layout: adminLayout });
};

const addgame = async (req, res) => {
    const game = new Game(req.body);
    await game.save();
    res.redirect('/admin');
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
    
        res.render('./pages/admin-home', { data, layout: adminLayout });
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {authMiddleWare, adminHomePage, removeGame, addgamePage, addgame, search};