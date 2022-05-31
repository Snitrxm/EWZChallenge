import { Router } from 'express'
import UserController from './controllers/UserController';
import WithAuth from './middlewares/auth';

const router = Router();


/* Principal Routes */
router.post('/user/register', UserController.register)
router.post('/user/login', UserController.login)
router.get('/user/alldeals',WithAuth,UserController.allDeals)
router.get('/user/wondeals',WithAuth,UserController.wonDeals)
router.get('/user/getdealsbyday/:day', WithAuth, UserController.getDealByDay)

/* Routes for Test */
router.get('/user/allrequests',UserController.allRequests)
router.delete('/user/requests/:id',UserController.deleteRequest)
router.get('/user', UserController.index)
router.get('/user/:id', UserController.findByID)
router.delete('/user/:id', UserController.delete)
router.put('/user/:id', UserController.update);


export default router;