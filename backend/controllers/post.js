const Post = require('../models/Post');

// add
async function addPost(post) {
  const newPost = await Post.create(post);

  await newPost.populate({
    path: 'comments',
    populate: 'author',
  });

  return newPost;
}

// edit
async function editPost(id, post) {
  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: 'after',
  });

  await updatedPost.populate({
    path: 'comments',
    populate: 'author',
  });

  return updatedPost;
}

// delete
function deletePost(id) {
  return Post.deleteOne({ _id: id });
}

// get list with search and pagination
async function getPosts(search = '', limit = 10, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: 'i' } }) //regex for the search as peace of text and not exact match, options for the any case letter - aA
      .limit(limit)
      .skip((page - 1) * limit) // how many pages to skip based on actual page position
      .sort({ createdAt: -1 }), // -1 means DESC, 1 means ASC
    Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}

// get item
function getPost(id) {
  return Post.findById(id).populate({
    path: 'comments',
    populate: 'author',
  });
}

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getPost,
};
