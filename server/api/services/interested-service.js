import User from "./../models/user.js";
import Post from "./../models/post.js";

export const addInUser = async (user, postId) => {
  return await user.updateOne({
    $push: {
      interestedPosts: postId,
    },
  });
};

export const addInPost = async (post, data) => {
  return await post.updateOne({
    $push: {
      interestedUsers: data,
    },
  });
};

export const getByIdUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const getByIdPost = async (postId) => {
  const post = await Post.findById(postId);
  return post;
};

export const updateStatus = async (userId, postId, status) => {
  Post.updateOne(
    {
      _id: postId,
      "interestedUsers.userId": userId,
    },
    {
      $set: {
        "interestedUsers.$.status": status,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Docs : ", docs);
      }
    }
  );
};
