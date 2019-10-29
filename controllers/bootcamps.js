const Bootcamp = require('../models/Bootcamp')



// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public - do not need token
exports.getBootcamps = (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            msg: 'show all bootcamps',

        })
}


// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public - do not need token
exports.getBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            msg: `get bootcamp by ${req.params.id}`
        })
}

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private - Have to be logged in / send a token
exports.createBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
        success: true,
        data: bootcamp
    })
    res
        .status(200)
        .json({
            success: true,
            msg: 'create new bootcamps'
        });
}


// @desc        update exsisting bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            msg: `update bootcamp ${req.params.id}`
        })
}


// @desc        dalete exsisting bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            msg: `Delete bootcamp ${req.params.id}`
        })
}