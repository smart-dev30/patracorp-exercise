import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// Function to handle user signup
const signup = async (req, res) => {
  const { firstName, lastName, password, email, phone, address, city, state } = req.body

  try {
    // Checking if a user with the provided email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      // If user already exists, return an error response
      return res.status(400).json({ message: 'User Already Exist' })
    }

    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12)

    // Creating a new user document in the database
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      state,
    })

    // Generating a JWT token for the newly created user
    const token = jwt.sign(
      { _id: result._id }, // Payload containing the user's ID
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: '24h' }, // Set Expiration time for the token to 1 day
    )

    return res.status(200).json({ token })
  } catch (error) {
    // Returning an error response if something goes wrong
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export default signup
