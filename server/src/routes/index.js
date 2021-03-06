const express = require('express');
const router = express.Router();

const articleRoute = require('./ArticleRoutes');
const categoryRoute = require('./CategoryRoutes');
const commentrRoute = require('./CommentRoutes');
const destinationRoute = require('./DestinationRoutes');
const pictureRoute = require('./PictureRoutes');
const planRoute = require('./PlanRoutes');
const siteRoute = require('./SiteRoutes');
const userRoute = require('./UserRoutes');
const authRoute = require('./AuthRoutes');
const searchRoute = require('./SearchRoutes');

router.use('/articles', articleRoute);
router.use('/categorys', categoryRoute);
router.use('/comments', commentrRoute);
router.use('/destinations', destinationRoute);
router.use('/pictures', pictureRoute);
router.use('/plans', planRoute);
router.use('/sites', siteRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/search', searchRoute);

module.exports = router;
