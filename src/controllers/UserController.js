let users = require('../mocks/users');

module.exports = {
  listUsers: (request, response) => {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1 
      }

      return a.id > b.id ? 1 : -1 
    })

    response.send(200, sortedUsers);
  },

  getUserById: (request, response) => {
    const { id } = request.params;

    const user = users.find(userObj => userObj.id === +id);

    if (user) {
      return response.send(200, user);
    }

    response.send(400, { error: 'User not found' });
  },

  createUser: (request, response) => {
   
    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id: lastUserId + 1,
      name: request.body.name,
      email: request.body.email
    };

    users.push(newUser)

    response.send(200, newUser);
  },

  updateUser: (request, response) => {
    const { id } = request.params;
    const { name, email } = request.body;

    const user = users.find(userObj => userObj.id === +id);

    if (user) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;

      return response.send(200, user);
    }

    response.send(400, { error: 'User not found' });
  },

  deleteUser: (request, response) => {
    const { id } = request.params;

    users = users.filter(user => user.id !== +id)
    return response.send(200, { deleted: true });
  }
}