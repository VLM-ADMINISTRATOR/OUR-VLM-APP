export const getUserProfile = async (req, res) => {
  const user = await user.findById(req.user._id).select('-password');
  res.json(user);
};