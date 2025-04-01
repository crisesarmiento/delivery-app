import { IBranch } from '@/types';

/**
 * Checks if a branch is currently open based on system time and opening hours
 * @param branch The branch to check
 * @returns boolean indicating if the branch is open
 */
export const isBranchOpen = (branch: IBranch): boolean => {
  if (!branch.openingHoursStructured) {
    // If no structured hours data, fallback to the isOpen flag if it exists
    return branch.isOpen ?? true;
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday

  // Determine if it's a weekend (0 Sunday or 6 Saturday)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Get the relevant opening hours based on day type
  const hours = isWeekend
    ? branch.openingHoursStructured.weekend
    : branch.openingHoursStructured.weekdays;

  // Convert opening and closing hours to minutes for easier comparison
  const openTime = convertTimeToMinutes(hours.open);
  const closeTime = convertTimeToMinutes(hours.close);
  const currentTime = currentHour * 60 + currentMinutes;

  return currentTime >= openTime && currentTime < closeTime;
};

/**
 * Converts time in "HH:MM" format to minutes since midnight
 * @param time Time string in format "HH:MM"
 * @returns Total minutes since midnight
 */
const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Updates branch objects with their current open/closed status
 * @param branches Array of branch objects
 * @returns Same branches with updated isOpen property
 */
export const updateBranchesStatus = (branches: IBranch[]): IBranch[] => {
  return branches.map((branch) => ({
    ...branch,
    isOpen: isBranchOpen(branch),
  }));
};
