const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp');




// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public - do not need token
exports.getBootcamps = async (req, res, next) => {

    try {
        const bootcamps = await Bootcamp.find();


        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
    } catch (err) {
        next(err)
    }
    res

}


// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public - do not need token
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}, 404`))
        }

        res.status(200).json({ success: true, data: bootcamp })

    } catch (err) {
        next(err)
    }
}

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private - Have to be logged in / send a token
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        })

    } catch (err) {
        next(err)
    }

}


// @desc        update exsisting bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err)
    }
}


// @desc        dalete exsisting bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} })

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}, 404`))
    }
}