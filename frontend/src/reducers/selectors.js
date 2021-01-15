export const formatUsers = (users) => {
  console.log("HERE FOR MAT USERS");
  let userObject = {};
  users.forEach((user) => {
    userObject[user._id] = user;
  });
  return userObject;
};
