const sendToken = async (user, statusCode, message, res) => {
    const token = user.getJWTToken();
  
    await user.save();
  
    // sending response back
    res.status(statusCode).json({
      success: true,
      message,
      auth_token: token,
    });
  };
  
  export default sendToken;