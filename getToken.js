const jwt = require('jsonwebtoken')
const getToken = (id) =>{
    return jwt.sign({id}, "nitinvdaiviusdgegf23654")
}

module.exports = getToken