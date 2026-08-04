/**
 * The four introduction stages.
 *
 * Ordered as a single argument: what we make → how it solves your problem →
 * what that does for your customers → why we are the ones to do it.
 */
export type Stage = {
  id: string;
  index: string;
  kicker: string;
  title: string[];
  body: string;
  points: string[];
  asset: string;
  /** Which side the asset sits on at desktop widths. */
  side: 'left' | 'right';
};

export const introStages: Stage[] = [
  {
    id: 'build',
    index: '01',
    kicker: 'What we build',
    title: ['Not a template.', 'A built thing.'],
    body:
      'Every site is designed and built from nothing for the business it belongs ' +
      'to — structure, words, motion and the way it behaves on a phone. No theme ' +
      'with your logo dropped into the corner.',
    points: ['Custom design direction', 'Built mobile-first', 'Real forms and systems'],
    asset: '/assets/stages/stage1.webp',
    side: 'left',
  },
  {
    id: 'solve',
    index: '02',
    kicker: 'How we solve your problem',
    title: ['We find where', 'the work leaks.'],
    body:
      'Most sites lose people at one identifiable point — an unclear offer, a ' +
      'buried phone number, a form nobody answers. We take the thing apart, find ' +
      'that point, and design around it.',
    points: ['Diagnose before designing', 'Fix the drop-off', 'Measure what changed'],
    asset: '/assets/stages/stage2.webp',
    side: 'right',
  },
  {
    id: 'trust',
    index: '03',
    kicker: 'How your website builds trust',
    title: ['People decide', 'in seconds.'],
    body:
      'Before they read a word, visitors have judged whether you look established. ' +
      'Clear pricing, real photographs, visible reviews and a site that feels ' +
      'considered do more for trust than any promise you can write.',
    points: ['Pricing in the open', 'Reviews surfaced early', 'Fast on any connection'],
    asset: '/assets/stages/stage3.webp',
    side: 'left',
  },
  {
    id: 'why',
    index: '04',
    kicker: 'Why businesses trust HTT',
    title: ['You own it.', 'We stay reachable.'],
    body:
      'Fixed quote before anything starts. The site is yours once it is paid for. ' +
      'And when you need something changed a year from now, you are talking to ' +
      'the people who built it.',
    points: ['Fixed quote, no surprises', 'You own the work', 'Support that answers'],
    asset: '/assets/stages/stage4.webp',
    side: 'right',
  },
];
