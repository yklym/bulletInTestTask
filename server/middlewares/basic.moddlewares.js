module.exports.sendResponse = function (req, res, next) {
    const defaultErrString = "Some error occured with your request";
    if (res.isErr) {
        const defaultErrCode = 400
        res.status(res.isErr.code || defaultErrCode).json({
            "err": true,
            "message": res.isErr.message || defaultErrString
        })
    } else if (!res.isSuccess) {
        res.status(400).json({"err": true, "message": defaultErrString})
    } else {
        const defaultSuccessCode = 200
        res.status(res.isSuccess.code || defaultSuccessCode).json({"data": res.isSuccess.data})
    }
    next()
}