import express from 'express'
import { loginUser, allUsers, signupUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser, getUserById, updateUserById } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


const router = express.Router()



router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/allusers', allUsers)
router.get('/admingetallusers', protect, admin, getAllUsers)
router.put('/adminupdateuser/:id', protect, admin, updateUserById)
router.get('/admingetuser/:id', protect, admin, getUserById)
router.delete('/admindeleteuser/:id', protect, admin, deleteUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)



export default router;