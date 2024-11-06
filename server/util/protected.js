export const protectedRoutes = (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    return res.status(404).json({ error: "Not authorized" });
  }
  next();
};
