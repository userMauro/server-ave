const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username:           { type: String, required: true, unique: true },
    email:              { type: String, required: true, unique: true },
    passwordHash:       { type: String, required: true },
    role:               { type: String, required: true },   // role example: admin/mod/user/banned
});

// validar atributos 'unique'
    userSchema.plugin(uniqueValidator);

// eliminar _id y __v al devolverlos de la database
    userSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
            delete returnedObject.passwordHash;  // no revelar passwordHash
        }
    });

const User = mongoose.model('User', userSchema);
module.exports = User;