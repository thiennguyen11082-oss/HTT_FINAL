import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from './stage';

/** React-facing view of the discrete stage state. */
export function useStage() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
