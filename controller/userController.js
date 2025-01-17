const User = require('../server/models/user');
const Game = require('../server/models/game');
const jwt = require('jsonwebtoken');

const userLayout = 'layouts/user';
const jwtSecret = process.env.JWT_SECRET;

const authMiddleWare = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        res.redirect('/');
    }

    try{
        const decode = jwt.verify(token, jwtSecret);
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

const userHomePage = async (req, res) => {
    try{
        const data = await Game.find();
        res.render('./pages/user-home', { data: data, layout: userLayout});
    }
    catch(err){
        console.log(err);
    }
};

const addtocart = async (req, res) => {
    const id = req.params.id;

    const user = await findUserByToken(req)
    const exist = user.games.includes(id);

    if(exist){
        return res.redirect('/user');
    }

    user.games.push(id);
    await user.save();

    res.redirect('/user');
};

const removefromcart = async (req, res) => {
    const id = req.params.id;

    const user = await findUserByToken(req);
    const exist = user.games.includes(id);

    if(!exist){
        return res.redirect('/user/cart');
    }

    const idx = user.games.indexOf(id);
    if(idx !== -1){
        user.games.splice(idx, 1);
    }

    await user.save();
    res.redirect('/user/cart');
};

const cart = async (req, res) => {
    const user = await findUserByToken(req);
    const gameids = user.games;
    let games = [];
    let total = 0;
    for (const id of gameids) {
        const game = await Game.findById(id);
        if (game) {
            games.push(game);
            total += game.price;
        }
    }
    res.render('./pages/cart', {games: games, total: total, layout: userLayout});
};

const prush = async (req, res) => {
    const user = await findUserByToken(req);
    user.games = [];
    await user.save();
    res.render('./pages/thank-you' , { layout: userLayout });
}

const search = async (req, res) => {
    try{
        const search = req.body.q;
        const searchNospecialchars = search.replace(/[^a-zA-Z0-9]/g, '');
        const data = await Game.find({
            $or: [
                {name: {$regex: new RegExp(searchNospecialchars, 'i')}}
            ]
        })
    
        res.render('./pages/user-home', { data, layout: userLayout });
    }
    catch(err){
        console.log(err);
    }
};

module.exports = { authMiddleWare, userHomePage, addtocart, removefromcart, cart, prush, search};