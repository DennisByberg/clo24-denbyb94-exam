/**
 * Get required environment variable or throw clear error
 * @param key - Environment variable name
 * @returns Environment variable value
 * @throws Error if environment variable is not set
 */
export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
