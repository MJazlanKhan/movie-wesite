import express from "express"
// import Controller from "./Controller/Controller.js"
import Controller from "../Controller/Controller.js"

const router = express.Router();



router.post('/user/signup', Controller.userRegisteration)
router.post('/user/signin', Controller.userLogin)
router.post('/admin', Controller.adminLogin)
router.post('/admin/post', Controller.createPost)
router.get('/admin/allPosts', Controller.allPosts)
router.get('/admin/allUsers', Controller.allUsers)
router.delete('/admin/post/:postId', Controller.deletePost)
router.put('/admin/post/:postId', Controller.editPost)
router.put('/admin/user/disable/:userId', Controller.disableUser)
router.put('/admin/user/enable/:userId', Controller.enableUser)
router.put('/users/wishlist/add', Controller.addtoWishlist)
router.delete('/users/wishlist/remove/:userId/:postId', Controller.RemoveWishlist)
router.get('/users/wishlist/:userId', Controller.Wishlist)
router.get('/post/:postId', Controller.SinglePost)
router.get('/user/:userId', Controller.SingleUser)
router.put('/user/profile/:userId', Controller.editProfile)
router.put('/user/profileDetails/:userId', Controller.editProfileDetails)



export default router