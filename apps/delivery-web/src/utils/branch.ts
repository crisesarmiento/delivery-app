import { IBranch } from '@/types';

/**
 * Checks if a branch is currently open based on system time and opening hours.
 * @param branch The branch to check
 * @param now Optional date/time to check against (defaults to current time)
 * @returns boolean indicating if the branch is open
 */
export const isBranchOpen = (branch: IBranch, now: Date = new Date()): boolean => {
  if (!branch.openingHoursStructured) {
    return branch.isOpen ?? true;
  }

  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const dayOfWeek = now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  const currentTime = currentHour * 60 + currentMinutes;

  // Helper to check a shift
  const isInShift = (open: string, close: string) => {
    const openTime = convertTimeToMinutes(open);
    const closeTime = convertTimeToMinutes(close);
    return currentTime >= openTime && currentTime < closeTime;
  };

  // Friday (5), Saturday (6), Sunday (0): use fridayToSunday
  if ([0, 5, 6].includes(dayOfWeek) && branch.openingHoursStructured.fridayToSunday) {
    const { firstShift, secondShift } = branch.openingHoursStructured.fridayToSunday;
    if (firstShift && isInShift(firstShift.open, firstShift.close)) return true;
    if (secondShift && isInShift(secondShift.open, secondShift.close)) return true;
    return false;
  }

  // Monday to Thursday (1-4): use mondayToThursday
  if ([1, 2, 3, 4].includes(dayOfWeek) && branch.openingHoursStructured.mondayToThursday) {
    const { open, close } = branch.openingHoursStructured.mondayToThursday;
    return isInShift(open, close);
  }

  return false;
};

const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};
