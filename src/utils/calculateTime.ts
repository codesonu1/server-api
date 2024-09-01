export const calculatetime = (time: any) => {
    const pastTime: any = new Date(time)
    // Get the current time
    const currentTime: any = new Date();
    // Calculate the difference in milliseconds
    const timeDifference = currentTime - pastTime;
    // Convert the difference into hours, minutes, and seconds
    const diffHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const diffMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
        hrs: diffHours,
        mins: diffMinutes,
        sec: diffSeconds
    }

}