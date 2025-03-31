var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
const { check_authentication } = require('../Utils/check_auth');
const { validators, validator_middleware } = require('../Utils/validator');
router.post('/signup',validators, validator_middleware, async function(req, res, next) {
    try {
        let body = req.body;
        let result = await userController.createUser(
          body.avatarUrl,
          body.fullName,
          
          body.username,
          body.password,
          body.email,
          'USER'
        )
        res.status(200).send({
          success:true,
          data:result
        })
      } catch (error) {
        next(error);
      }

})
router.post('/login',validators, validator_middleware, async function(req, res, next) {
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
module.exports = router