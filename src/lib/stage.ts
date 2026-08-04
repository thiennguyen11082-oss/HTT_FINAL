/**
 * Whether the opening sequence is still running.
 *
 * Deliberately tiny: the redesign has no scroll-driven 3D state machine, so
 * this only needs to carry the preloader phase to the header and hero.
 */
export type Phase = 'loading' | 'live';

type Snapshot = { phase: Phase };

let snapshot: Snapshot = { phase: 'loading' };
const listeners = new Set<() => void>();

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getSnapshot(): Snapshot {
  return snapshot;
}

export function setStage(patch: Partial<Snapshot>) {
  if (patch.phase === undefined || patch.phase === snapshot.phase) return;
  snapshot = { ...snapshot, ...patch };
  listeners.forEach((fn) => fn());
}

export { prefersReducedMotion, isCoarsePointer } from './scroll';
