export function formatDateToCustom(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // الشهر بيبدأ من 0
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // تحويل 0 لـ 12 عشان نظام الـ 12 ساعة

  const formattedHours = hours.toString().padStart(2, "0");

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
}
