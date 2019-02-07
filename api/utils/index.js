exports.Timer = function () {
    this.timestamps = 0;
    this.duration = 0;
    this.prototype.startTimer = (timestamps = Date.now()) => {
        this.timestamps = timestamps;
        return this.timestamps;
    };
    this.prototype.endTimer = (timestamps = Date.now()) => {
        this.duration = timestamps - this.timestamps;
        return this.duration;
    };
};
