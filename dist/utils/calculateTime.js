"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatetime = void 0;
const calculatetime = (time) => {
    const pastTime = new Date(time);
    const currentTime = new Date();
    const timeDifference = currentTime - pastTime;
    const diffHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const diffMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return {
        hrs: diffHours,
        mins: diffMinutes,
        sec: diffSeconds
    };
};
exports.calculatetime = calculatetime;
//# sourceMappingURL=calculateTime.js.map