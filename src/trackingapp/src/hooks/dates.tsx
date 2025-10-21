export const formatDate = (dateStr: Date|string|undefined, o?: any) => {
  if (!dateStr) { return 'N/A' }
  const d = new Date(dateStr);
  const day = d.getUTCDate();
  const date = (day < 10) ? '0' + day : day;
  const m = +(d.getUTCMonth() + 1);
  const month = (m < 10) ? '0' + m : m;
  const year = d.getUTCFullYear();
  const h = d.getUTCHours();
  const hour = (h < 10) ? `0${h}` : h;
  const min = (d.getUTCMinutes() < 10) ? `0${d.getUTCMinutes()}` : d.getUTCMinutes();
  const time = (o && o.includeTime) ? ` ${hour}:${min}` : '';

  return `${date}-${month}-${year} ${time}`;
}