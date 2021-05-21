var authController = {};

authController.protectedRoute = function (req, res, next) {
  if (req.session.user) {
    next(); //If session exists, proceed to page
  } else {
    var err = new Error('Not logged in!');
    next(err); //Error, trying to access unauthorized page!
  }
};

authController.isLoggedIn = function (req, res, next) {
  if (req.session.user) {
    res.redirect('signup');
  } else {
    next();
  }
};

authController.login = function (req, res) {
  const { content } = res;
  res.render('auth/login', { content, message: '', options: req.options });
};

authController.loginPost = function (req, res, next) {
  const { content, options } = res;
  if (!req.body.id || !req.body.password) {
    res.render('auth/login', {
      content,
      message: 'Please enter both id and password',
      options: req.options,
    });
  } else {
    options.users.filter(function (user) {
      if (user.id === req.body.id && user.password === req.body.password) {
        req.session.user = user;
        res.redirect('/events/signup');
      }
    });
    var err = new Error('Invalid credentials!');
    next(err); //Error, trying to access unauthorized page!
  }
};

authController.logout = function (req, res) {
  req.session.destroy(function () {
    console.log('user logged out.');
  });
  res.redirect('/');
};

module.exports = authController;
