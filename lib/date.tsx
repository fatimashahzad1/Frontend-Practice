import { FEED_DAY_UNITS } from '@/constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getRelativeTime = (createdAt: string) => {
  const now = dayjs();
  const diffInSeconds = now.diff(createdAt, 'second');
  for (const { unit, threshold, suffix } of FEED_DAY_UNITS) {
    if (Math.abs(diffInSeconds) >= threshold) {
      return `${now.diff(createdAt, unit)}${suffix}`;
    }
  }
  return `${diffInSeconds}s`;
};
