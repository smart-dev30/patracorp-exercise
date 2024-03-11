import User from '../models/user.js'

// Function to get user profile by user ID
const getUserProfile = async (req, res) => {
  try {
    // Find existing suer, but If user doesn't exist, return a 404 Not Found response
    const existingUser = await User.findById(req.params.userId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist' })
    }

    // If user exists, return the user profile as a JSON response
    return res.status(200).json(existingUser)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export { getUserProfile }
