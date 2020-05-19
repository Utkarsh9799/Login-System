module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        else {
            req.flash('error_msg', 'Please login to access the dashboard!');
            res.redirect('/users/login');
        }
    }
}