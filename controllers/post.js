import Post from '../models/post.js';
import User from "../models/user.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";
//import upload from '../middleware/multer.js';


//Create Post
export const createPost = async (req,res) => {
  // Add 'upload' middleware here
  //console.log("sccpp");
  // upload.single('image')(req, res, async (err) => {
  //   if (err) {
  //     return res.status(400).json({
  //       success: false,
  //       message: err,
  //     });
  //   }
  //   console.log("ccpp");

  try{
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //   folder: "posts",
    // });

    const newPostData = {
      title: req.body.title,
      owner: req.user.id,
      content: req.body.content,
      subheading: req.body.subheading,
      tags: req.body.tags,
      thumbnail: {
        public_id: req.body.image.public_id,
        url: req.body.image.url,
      }
    };

    const post = await Post.create(newPostData);
    const user = await User.findById(req.user.id);

    user.posts.unshift(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




//Delete Post
export const deletePost = async (req,res) => {
  try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.owner.toString() !== req.user.id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }

      await cloudinary.v2.uploader.destroy(post.thumbnail.public_id);
  
      await post.remove();
  
      const user = await User.findById(req.user.id);
  
      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
  }
};




//Like-Unlike Post
export const likeUnlikePost = async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      //console.log(post);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
      
  
      if (post.likes.includes(req.user.id)) {
        const index = post.likes.indexOf(req.user.id);
        post.likes.splice(index, 1);
        //console.log(index);
  
        await post.save();
        //console.log("here2");
  
        return res.status(200).json({
          success: true,
          message: "Post Unliked",
        });
      } else {
        post.likes.push(req.user.id);
  
        await post.save();
        //console.log("here");
  
        return res.status(200).json({
          success: true,
          message: "Post Liked",
        });
      }
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
  }
};



//Update Achievement descriptions
export const updatePostDesc = async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
  
      const { title, content , subheading, tags } = req.body;

      if (!post) {
          return res.status(404).json({
            success: false,
            message: "Post not found",
          });
      }
    
      if (post.owner.toString() !== req.user.id.toString()) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
      }
  
      if (title) {
        post.title = title;
      }
      if (content) {
        post.content = content;
      }
      if (subheading) {
          post.subheading = subheading;
      }
      if (tags) {
        post.tags = tags;
      }
  
      await post.save();
      res.status(200).json({
        success: true,
        message: "Post updated",
        post
      });
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
  }
};



//Comment on Post
export const commentOnPost = async (req, res)=>{
  try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      let commentIndex = -1;
  
      // Checking if comment already exists
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user.id.toString()) {
          commentIndex = index;
        }
      });
  
      if (commentIndex !== -1) {
        post.comments[commentIndex].comment = req.body.comment;
  
        await post.save();
        //console.log(post);
        return res.status(200).json({
          success: true,
          message: "Comment Updated",
          post
        });
      } else {
        post.comments.push({
          user: req.user.id,
          comment: req.body.comment,
        });
        await post.save();
        //console.log(post);
        return res.status(200).json({
          success: true,
          message: "Comment added",
          post
        });
      }
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
  }
};




//Delete Comment
export const deleteComment = async(req, res) => {
  try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
      // Checking If owner wants to delete
  
      if (post.owner.toString() === req.user.id.toString()) {
        if (req.params.commentId === undefined) {
          return res.status(400).json({
            success: false,
            message: "Comment Id is required",
          });
        }
  
        post.comments.forEach((item, index) => {
          if (item._id.toString() === req.params.commentId.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Selected Comment is deleted",
        });
      } else {
        post.comments.forEach((item, index) => {
          if (item.user.toString() === req.user.id.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Your Comment is deleted",
        });
      }
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
  }
};



//Get All Posts
export const getallPost = async (req,res)=>{
  const apiFeatures = new ApiFeatures(Post.find(), req.query).search().filter();
    try{
      apiFeatures.query = apiFeatures.query.sort({ createdAt: -1 });

    // Execute the query
       const posts = await apiFeatures.query;
        //const post = await Post.find().populate("owner");
        res.status(200).json({
          success: true,
          posts,
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};



//Get  post by id
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
