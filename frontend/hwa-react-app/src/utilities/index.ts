export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  // Define options for date and time formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  // Format the date to a readable string
  const legibleDate = date.toLocaleDateString('en-US', options);
  return legibleDate;
};

export const createFormDropdownObject = (arr: string[]) => {
  const sortedArray = [...arr, 'None'].sort((a, b) =>
    a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
  );
  return sortedArray.map((value) => ({ label: value, value }));
};
