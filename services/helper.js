const sendResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        status: statusCode,
        message,
        data,
    });
};
module.exports = { sendResponse };