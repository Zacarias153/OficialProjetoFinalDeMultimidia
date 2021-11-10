export const timeToString = (duration: number) =>{
    const minutes = Math.trunc(duration/60);
    const seconds = Math.trunc(duration % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`
}