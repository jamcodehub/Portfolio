import { createTimeline, stagger, splitText } from 'https://esm.sh/animejs';

export function runMyAnimation() {
  if (!document.querySelector('.animated-text')) {
    console.warn("Waiting for .animated-text to render...");
    return;
  }

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
}