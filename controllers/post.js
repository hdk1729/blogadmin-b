//exports.createPost =(req,res)=>{
//    res.send("ok");
//};
import Post from '../models/post.js'


export const createPost = async (req, res) => {
    try {
    console.log(req.file);
    const { title, meta, content, slug, author, tags } = req.body;
    console.log(title)
    const newPost =new Post({title,meta,content,slug,author,tags});
    await newPost.save();
    res.json(newPost);
    
} catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};