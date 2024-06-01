const { body, validationResult, check } = require('express-validator');
const UserRegisterValidation = () => {
    return [
        body('name').notEmpty().withMessage("Name Required"),
        body('password').notEmpty().withMessage("Password Required").isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1
        }).withMessage("Paasword Minimum 8 characters, must include one uppercase letter, one lowercase letter, and one symbol"),
        body('email').notEmpty().withMessage("Email Required").isEmail().withMessage("Email Must be a valid email")
    ];
};

const UserLoginValidation = () => {
    return [
        body('password').notEmpty().withMessage("Password Required"),
        body('email').notEmpty().withMessage("Email Required")
    ];
};

const BlogValidation = () => {
    return [
        check('title').custom((value, {req}) => {
            if (req.body.title != ''){
                return true; 
            }else{
                return false; // return "falsy" value to indicate invalid data
            }
        }).withMessage("title should be a required"),
        check('content').custom((value, {req}) => {
            if(req.body.content != ''){
                return true; 
            }else{
                return false; // return "falsy" value to indicate invalid data
            }
        }).withMessage("content not formated"),
        check('image').custom((value, {req}) => {
            let file = req.file;
            if((typeof file != 'undefined' && (req.file.mimetype).includes( 'image' )) || typeof file == 'undefined'){
                return true; 
            }else{
                return false; // return "falsy" value to indicate invalid data
            }
        }).withMessage("Invalid Image"),
    ];
};

const CommentValidation = () => {
    return [
        body('content').notEmpty().withMessage("content Required").isString().withMessage('Content should be a string')
    ];
};

module.exports = { UserRegisterValidation, UserLoginValidation, BlogValidation, CommentValidation };