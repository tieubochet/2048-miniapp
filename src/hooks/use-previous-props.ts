import { useEffect, useRef } from "react";

export default function usePreviousProps<K = any>(value: K) {
  // FIX: Pass `undefined` as an argument to `useRef` to fix the "Expected 1 arguments" error.
  const ref = useRef<K | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
