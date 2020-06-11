module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) return next();
    
        req.flash('error_message', 'You need to log in first.');
        res.redirect('/users/login');
    }
}