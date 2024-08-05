export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [key, value] of Object.entries(intervals)) {
    const count = Math.floor(diffInSeconds / value);
    if (count > 0) {
      return count === 1 ? `1 ${key} ago` : `${count} ${key}s ago`;
    }
  }

  return 'Just now';
};

export const formatMetaDataDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

//get date for API requests
export const getDateRanges = () => {
  const getCurrentDate = () => new Date().toISOString().split('T')[0];
  const getLastYearDate = () => {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    return lastYear.toISOString().split('T')[0];
  };
  const getNextYearDate = () => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    return nextYear.toISOString().split('T')[0];
  };

  return {
    currentDate: getCurrentDate(),
    lastYearDate: getLastYearDate(),
    nextYearDate: getNextYearDate(),
  };
};

//date for firebase creation date
export function formatDate(dateString: string): string {
  // Split the date string into parts
  const parts = dateString.split('T')[0].split('-');

  // Convert month from numeric to abbreviation
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthAbbr = months[parseInt(parts[1], 10) - 1];

  // Formatted date string "Jul 16, 2024"
  return `${monthAbbr} ${parseInt(parts[2], 10)}, ${parts[0]}`;
}