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

  // Determine if it's a weekend (0 Sunday or 6 Saturday) or Friday (5)
  const isWeekendOrFriday =
    dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
  const currentTime = currentHour * 60 + currentMinutes;

  // Check based on day type
  if (isWeekendOrFriday && branch.openingHoursStructured.fridayToSunday) {
    // Weekend or Friday - check both shifts
    const { firstShift, secondShift } =
      branch.openingHoursStructured.fridayToSunday;

    // First shift check
    if (firstShift) {
      const openTimeFirstShift = convertTimeToMinutes(firstShift.open);
      const closeTimeFirstShift = convertTimeToMinutes(firstShift.close);

      if (
        currentTime >= openTimeFirstShift &&
        currentTime < closeTimeFirstShift
      ) {
        return true;
      }
    }

    // Second shift check
    if (secondShift) {
      const openTimeSecondShift = convertTimeToMinutes(secondShift.open);
      const closeTimeSecondShift = convertTimeToMinutes(secondShift.close);

      if (
        currentTime >= openTimeSecondShift &&
        currentTime < closeTimeSecondShift
      ) {
        return true;
      }
    }

    return false;
  } else if (branch.openingHoursStructured.mondayToThursday) {
    // Monday to Thursday - single shift
    const { open, close } = branch.openingHoursStructured.mondayToThursday;
    const openTime = convertTimeToMinutes(open);
    const closeTime = convertTimeToMinutes(close);

    return currentTime >= openTime && currentTime < closeTime;
  }

  // Default fallback
  return false;
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
