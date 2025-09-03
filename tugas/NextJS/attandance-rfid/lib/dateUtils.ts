// utils/dateUtils.ts
// export function formatDateToCustomString(dateString: string): string {
//   const date = new Date(dateString);
//   const options = {
//     weekday: "long" as const,
//     day: "2-digit" as const,
//     month: "short" as const,
//     year: "numeric" as const,
//   };

//   const formattedDate = date.toLocaleDateString(undefined, options);
//   return formattedDate;
// }

export function formatDateIntl(dateString: string) {
  const date = new Date(dateString);
  let options = {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

export function formatDateTimeIntl(dateString: string) {
  const date = new Date(dateString);
  let options = {
    hour: "numeric" as const,
    minute: "numeric" as const,
    hour12: false,
    timeZone: "Asia/Jakarta",
    timeZoneName: "short" as const,
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}
