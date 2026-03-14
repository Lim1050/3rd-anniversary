function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getRelationshipDuration(dateString, nowDate = new Date()) {
  const start = parseLocalDate(dateString);
  const now = startOfDay(nowDate);

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
    ).getDate();
    days += daysInPrevMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function getTotalDaysTogether(
  dateString,
  nowDate = new Date(),
  inclusive = false,
) {
  const start = parseLocalDate(dateString);
  const now = startOfDay(nowDate);

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((now - start) / msPerDay);

  return inclusive ? diffDays + 1 : diffDays;
}

export function getRelationshipStats(dateString, nowDate = new Date()) {
  const duration = getRelationshipDuration(dateString, nowDate);
  const totalDays = getTotalDaysTogether(dateString, nowDate, false);
  const totalDaysInclusive = getTotalDaysTogether(dateString, nowDate, true);

  return {
    ...duration,
    totalDays,
    totalDaysInclusive,
  };
}

export function formatDateID(dateString) {
  const date = parseLocalDate(dateString);

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
