import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function cn(...classNames) {
  return twMerge(clsx(classNames));
}
