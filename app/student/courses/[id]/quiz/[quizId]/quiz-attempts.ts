/**
 * Persist quiz attempts in localStorage for orientation "Last Attempt" and attempt count.
 */

const STORAGE_KEY_PREFIX = "imets_quiz_attempts_";

export interface SavedQuizAttempt {
  date: number;
  scorePct: number;
  passed: boolean;
  timeTakenSeconds: number;
  recommendation?: string;
}

function getStorageKey(courseId: string, quizId: string): string {
  return `${STORAGE_KEY_PREFIX}${courseId}_${quizId}`;
}

const MAX_ATTEMPTS = 2;

export function getQuizAttempts(
  courseId: string,
  quizId: string
): SavedQuizAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(getStorageKey(courseId, quizId));
    if (!raw) return [];
    const data = JSON.parse(raw) as SavedQuizAttempt[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveQuizAttempt(
  courseId: string,
  quizId: string,
  attempt: SavedQuizAttempt
): void {
  if (typeof window === "undefined") return;
  try {
    const attempts = getQuizAttempts(courseId, quizId);
    attempts.push(attempt);
    window.localStorage.setItem(
      getStorageKey(courseId, quizId),
      JSON.stringify(attempts)
    );
  } catch {
    // ignore
  }
}

export function getLastAttempt(
  courseId: string,
  quizId: string
): SavedQuizAttempt | null {
  const attempts = getQuizAttempts(courseId, quizId);
  return attempts.length > 0 ? attempts[attempts.length - 1] : null;
}

export function getAttemptsUsed(courseId: string, quizId: string): number {
  return getQuizAttempts(courseId, quizId).length;
}

export { MAX_ATTEMPTS };
