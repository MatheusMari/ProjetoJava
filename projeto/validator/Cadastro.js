const Joi = require("joi");

const ValidadorCadastro = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': `O nome de usuário é obrigatório.`,
        'string.min': `O nome de usuário deve ter no mínimo {#limit} caracteres.`,
        'string.max': `O nome de usuário deve ter no máximo {#limit} caracteres.`
    }),
    email: Joi.string().email().required().messages({
        'string.empty': `O email é obrigatório.`,
        'string.email': `O email deve ser um email válido.`
    }),
    senha: Joi.string().min(6).max(30).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.empty': `A senha é obrigatória.`,
        'string.min': `A senha deve ter no mínimo {#limit} caracteres.`,
        'string.max': `A senha deve ter no máximo {#limit} caracteres.`,
        'string.pattern.base': `A senha deve conter apenas letras e números.`
    }),
    termos: Joi.boolean().optional().messages({
        'boolean.base': `O campo "termos" deve ser um valor booleano.`
    })
});

module.exports = ValidadorCadastro;
