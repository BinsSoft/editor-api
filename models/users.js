const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true
    },
    email : {
        type : String,
        unique: true,
        required : true,
        trim : true,
        
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [6, 'Password length minimum 6 characters'],
        trim : true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password shouldn\'t contain "password')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            //required : true
        }
    }]
},{
    timestamps :true
})

userSchema.virtual('snippet', {
    ref : 'Snippets',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign( { _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token : token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredential = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user) {
        throw 'Unable to login'
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if(!isMatch) {
        throw 'Unable to login'
    }
    return user
} 

userSchema.statics.findByEmail = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user) {
        throw 'Email not exist'
    }
    return user
} 
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User