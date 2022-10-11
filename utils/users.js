const users = []

function userJoin(id, username, receiver){
    const user = { id, username, receiver }

    users.push(user)
    return user
}

function getCurrUser(id){
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrUser
}