import { SORT_KEYS } from "../constants/sortKeys";

export type SortKey = (typeof SORT_KEYS)[keyof typeof SORT_KEYS];
