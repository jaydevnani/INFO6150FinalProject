import Post from "./../models/post.js";
import User from "./../models/user.js";

// get all post for a user
export const getAll = async (userId, postsArray) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  const result = [];
  const modifiedPosts = [];
  let contains = false;
  console.log("postarray posts are:" + postsArray);
  console.log("Posts length is:" + posts.length);

  posts.map((post, i) => {
    if (post.userId !== userId) {
      modifiedPosts.push(post);
    }
  });

  modifiedPosts.map((e1, i) => {
    console.log(e1._id);
    if (postsArray.some((e2) => e1._id == e2)) {
      contains = true;
      return;
    }
    if (!contains) {
      result.push(e1);
    } else {
      contains = false;
    }
  });
  return result;

  console.log("modifiedPosts length is:" + modifiedPosts.length);
};

export const getRequestedPostsId = async (userId) => {
  const { interestedPosts } = await User.findOne({ _id: userId });
  return interestedPosts;
};

// get all request post of a user
export const getMyRequests = async (postsArray) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  const result = [];

  posts.map((e1, i) => {
    if (postsArray.some((e2) => e2 == e1._id)) {
      result.push(e1);
    }
  });

  return result;
};

// create a post
export const save = async (newPost) => {
  const post = new Post(newPost);
  return post.save();
};

// get a single post
export const get = async (id) => {
  return await Post.findById(id);
};

export const getByUsername = async (username) => {
  return await User.findOne({ username: username }).sort({ createdAt: -1 });
};

// get all posts
export const getPostsForUser = async (id) => {
  return await Post.find({ userId: id }).sort({ createdAt: -1 });
};

// update a post
export const update = async (post, body) => {
  return await post.updateOne({ $set: body });
};

// delete a post
export const deletePost = async (post) => {
  return await post.deleteOne();
};
