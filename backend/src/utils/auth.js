import jwt from 'jsonwebtoken'

// Middleware function to authenticate user requests
const auth = async (req, res, next) => {
  try {
    // Extracting token from the request headers
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500

    let decodedData
    if (token && isCustomAuth) {
      // If the token is a custom token, verify it with the JWT_SECRET and extract user ID
      decodedData = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decodedData._id
    } else {
      // If the token is not custom, simply decode it and extract user ID
      decodedData = jwt.decode(token)
      req.userId = decodedData.sub
    }

    // Passing control to the next middleware in the chain
    next()
  } catch (error) {
    // Handling errors and returning an error response if authentication fails
    res.status(404).json({ message: 'User Not Found!' })
  }
}

export default auth
