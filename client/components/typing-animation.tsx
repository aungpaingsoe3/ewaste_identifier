"use client"
import { TypeAnimation } from "react-type-animation"

interface TypingAnimationProps {
  sequences: (string | number)[]
  className?: string
  repeat?: number
  speed?: number
  wrapper?: keyof JSX.IntrinsicElements
}

export function TypingAnimation({
  sequences,
  className,
  repeat = Number.POSITIVE_INFINITY,
  speed = 50,
  wrapper = "p",
}: TypingAnimationProps) {
  return <TypeAnimation sequence={sequences} wrapper={wrapper} speed={speed} className={className} repeat={repeat} />
}

