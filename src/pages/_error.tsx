// src/pages/_error.tsx
import NextErrorComponent from 'next/error'
import type { ErrorProps } from 'next/error'

export default function Error({ statusCode }: ErrorProps) {
  return <NextErrorComponent statusCode={statusCode} />
}
