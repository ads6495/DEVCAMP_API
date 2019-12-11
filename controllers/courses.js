const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc        Get courses
// @route       GET /api/v1/courses
// @route       GET /api/v1//bootcamps/:bootcampId/courses
// @access      Public - do not need token

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
        console.log('first cond.')
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
        console.log('else ran')
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});