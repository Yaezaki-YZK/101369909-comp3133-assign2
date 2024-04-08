const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const resolvers = {
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      try {
        //password hash
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, email, password: hashPassword });
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        console.error('Error in adding user:', error.message);
        throw new Error('Failed to add new user');
      }
    },
    login: async (_, { email, password }) => {
      try {
        //find existing user
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('Wrong password/username');
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        return token;
      } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed');
      }
    }
  }
};

module.exports = resolvers;
