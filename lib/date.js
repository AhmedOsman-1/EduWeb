export const formatMyDate = (date) => {
  if (!date) return "N/A"; 

  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  try {
 
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    return formattedDate;
  } catch (error) {
    console.error("Invalid date passed to formatMyDate:", date);
    return "Invalid Date";
  }
};
