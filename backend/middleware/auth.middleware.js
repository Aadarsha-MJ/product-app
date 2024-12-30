import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // Check if the token is in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header (Bearer token)
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user ID from the token to the request object
      req.user = decoded.id;
      next(); // Proceed to the next middleware/route
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
  }

  // If no token found in the header
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }
};

export { protect };
