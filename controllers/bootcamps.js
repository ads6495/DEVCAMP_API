const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp');




// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public - do not need token
exports.getBootcamps = asyncHandler(async (req, res, next) => {


    const bootcamps = await Bootcamp.find();


    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })


})


// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public - do not need token
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}, 404`))
    }

    res.status(200).json({ success: true, data: bootcamp })

})

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private - Have to be logged in / send a token
exports.createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp
    })



})


// @desc        update exsisting bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}, 404`))
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    });

})


// @desc        dalete exsisting bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} })

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}, 404`))
    }
})