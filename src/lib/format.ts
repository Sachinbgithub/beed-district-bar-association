const dateOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
};

export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", dateOptions).format(new Date(isoDate));
}

export function formatDateTime(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    ...dateOptions,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoDate));
}

export function splitEventDate(isoDate: string) {
  const date = new Date(isoDate);
  const day = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
  const monthYear = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .toUpperCase();

  return { day, monthYear };
}
