function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

export function fixCosmosId(id: string) {
  const replacements = [
    { from: "/", to: "_" },
    { from: "\\\\", to: "__" },
    { from: "?", to: "--" },
    { from: "#", to: "HASH" },
  ];

  let newString = id;
  replacements.forEach((r) => (newString = replaceAll(newString, r.from, r.to)));
  return newString;
}

// Convert to ISO8601 from ORM style date/times with no UTC timezone "2021-07-04 01:01:23"
export function convertOEMDateToISO8601(date: string) {
  const newDate = date.replace(" ", "T");
  if (newDate.endsWith("Z")) {
    return newDate;
  }
  return newDate + "Z";
}
