import { createTimeline, stagger, splitText } from 'https://esm.sh/animejs';

const { words, chars } = splitText('.animated-text', {
  words: { wrap: 'clip' },
  chars: true,
});

createTimeline({
  loop: true,
  defaults: { ease: 'inOut(3)', duration: 650 }
})
.add(words, {
  y: el => +el.dataset.line % 2 ? '100%' : '-100%',
}, stagger(125))
.add(chars, {
  y: el => +el.dataset.line % 2 ? '100%' : '-100%',
}, stagger(10, { from: 'random' }))
.init();