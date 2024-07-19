function isLoggedIn(req, res, next){
    if (req.cookies['token']== null || req.cookies['token']===''  ){
        return res.status(400).JSON({
            error : 'User must login before commenting on Blog'
        });

        next();
    }
}

module.exports= isLoggedIn;