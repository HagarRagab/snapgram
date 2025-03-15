export function createExpirationDate() {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 24);
    localStorage.setItem("expires", currentDate.toISOString());
}

export function checkTokenExpiration() {
    const expires = localStorage.getItem("expires");
    if (!expires) return undefined;

    const expireDate = new Date(expires);
    const currentDate = new Date();
    const leftedTime = expireDate.getTime() - currentDate.getTime();

    if (leftedTime <= 0) return null;
    return leftedTime;
}
