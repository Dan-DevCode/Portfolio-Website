/**
 * Client-side input sanitization utilities.
 * Defense-in-depth — all sensitive operations remain server-side.
 */

const CONTROL_CHARS = /[\x00-\x1f\x7f]/g
const DANGEROUS_CHARS = /[<>'"&\\]/g

export function sanitizeTextInput(input: string, maxLength = 256): string {
  return input.replace(CONTROL_CHARS, '').replace(DANGEROUS_CHARS, '').trim().slice(0, maxLength)
}

export function sanitizeTerminalCommand(input: string): string {
  const cleaned = sanitizeTextInput(input, 64)
  if (!/^[a-z0-9][a-z0-9\s_-]*$/i.test(cleaned)) return ''
  return cleaned
}

export function isSafeExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'mailto:'
  } catch {
    return false
  }
}
