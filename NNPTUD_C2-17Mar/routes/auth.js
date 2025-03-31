var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
const { check_authentication, check_admin } = require('../Utils/check_auth');
const { validators, validator_middleware } = require('../Utils/validator');
router.post('/signup', async function(req, res, next) {
    try {
        let body = req.body;
        let result = await userController.createUser(
          body.fullName,
          body.avatarUrl,
          body.username,
          body.password,
          body.email,
         'ADMIN'
        )
        res.status(200).send({
          success:true,
          data:result
        })
      } catch (error) {
        next(error);
      }

})
router.post('/login', async function(req, res, next) {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let result = await userController.checkLogin(username,password);
        res.status(200).send({
            success:true,
            data:result
        })
      } catch (error) {
        next(error);
      }

})
router.get('/me',check_authentication, async function(req, res, next){
    try {
      res.status(200).send({
        success:true,
        data:req.user
    })
    } catch (error) {
        next();
    }
})

router.get('/resetPassword/:id', check_authentication, check_admin, async function(req, res, next) {
  try {
    let userId = req.params.id;
    let user = await userController.getUserById(userId);
    if (user) {
      user.password = '123456'; // Reset mật khẩu về 123456
      await user.save();
      res.status(200).send({
        success: true,
        message: 'Password has been reset to 123456'
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router