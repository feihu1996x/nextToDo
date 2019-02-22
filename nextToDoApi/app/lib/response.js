exports.ResponseJson = (res, data = [], msg = 'success', status = 200, count) => {
    res
        .status(status)
        .json({
            msg,
            code: status < 400 ? 0 : -1,
            count: count ? count : data.length,
            data,
        });
    return res;
};