import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// postCard Time/Date format
dayjs.extend(relativeTime);

export const formatRelativeTime = (timestamp: string): string => {
  return dayjs(timestamp).fromNow();
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};