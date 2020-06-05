const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true,
        trim : true
    },
    snippetId : {
        type : Number,
        required : true,
        unique: true,
        trim : true
    },
    html : {
        type : String,
        trim : true
    },
    css : {
        type : String,
        trim : true
    },
    script : {
        type : String,
        trim : true
    },
    extended : {
        type : String,
        trim : true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
},{
    timestamps :true
})

snippetSchema.methods.toJSON = function () {
    const snippet = this
    const snippetObject = snippet.toObject()
    delete snippetObject.user_id
    delete snippetObject.user.password
    delete snippetObject.user.tokens
    return snippetObject
}

const Snippets = mongoose.model('Snippets', snippetSchema)

module.exports = Snippets