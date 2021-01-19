export const formatUsers = (users) => {
    let userObject = {}; 
    users.forEach((user) => {
        userObject[user._id] = user 
    })
    return userObject; 
}
