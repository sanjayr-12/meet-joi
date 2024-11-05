
export const protectedRoutes = (req,res, next) => {
    const id = req.auth.userId
    if (!id) {
        return res.status(404).json({error:"Not authorized"})
    }
    next()
}
