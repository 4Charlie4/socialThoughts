const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    //get thoughts with the option to retrieve thoughts from a single user
    //first argument is a placeholder which is required
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      //finds data from thought model and returns in descending order
      return Thought.find(params).sort({ createdAt: -1 });
    },
    //get one thought
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    //get All Users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
};

module.exports = resolvers;
