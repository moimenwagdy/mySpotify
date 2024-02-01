export default function setFutureDate(): void {
  const futureDate = new Date();
  futureDate.setHours(futureDate.getHours() + 1);
  localStorage.setItem("tokenExpire", futureDate.toISOString());
}

export const expirationDuration = function (): number | null {
  const date = localStorage.getItem("tokenExpire");
  if (date) {
    const futureDate = new Date(date!);
    const currentDate = new Date();
    const expired = futureDate.getTime() - currentDate.getTime();
    return expired;
  }
  return null;
};

export const myToken = function () {
  const userToken = localStorage.getItem("userToken");
  const nonUserToken = localStorage.getItem("nonUserToken");
  const expiration = expirationDuration();
  if (userToken) {
    return { userToken };
  }
  if (nonUserToken) {
    return { nonUserToken };
  }
  if (expiration && expiration < 0) {
    return { expired: "expired" };
  }
};
