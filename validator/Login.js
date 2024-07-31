const Joi = require("joi");

const ValidadorLogin = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': `O nome de usuário é obrigatório.`,
        'string.min': `O nome de usuário deve ter no mínimo {#limit} caracteres.`,
        'string.max': `O nome de usuário deve ter no máximo {#limit} caracteres.`
    }),
    senha: Joi.string().min(6).max(30).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.empty': `A senha é obrigatória.`,
        'string.min': `A senha deve ter no mínimo {#limit} caracteres.`,
        'string.max': `A senha deve ter no máximo {#limit} caracteres.`,
        'string.pattern.base': `A senha deve conter apenas letras e números.`
    })
});

module.exports = ValidadorLogin;
