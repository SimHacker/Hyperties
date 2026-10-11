import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const template = fs.readFileSync(new URL('viewer.html', import.meta.url), 'utf8');
const speechCode = template.slice(template.indexOf("const speechAvailable="), template.indexOf('let historyPosition='));

function setup(supported = true) {
  const elements = {
    'speak-definitions': { checked: false, disabled: false },
    'speech-status': { textContent: 'Browser speech notice' },
  };
  const spoken = [];
  const events = {};
  let canceled = 0;
  const speechSynthesis = { speak: u => spoken.push(u), cancel: () => canceled++ };
  const context = vm.createContext({
    window: supported ? { speechSynthesis, SpeechSynthesisUtterance: true } : {},
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    element: id => elements[id],
    addEventListener: (name, handler) => { events[name] = handler; },
  });
  vm.runInContext(speechCode, context);
  return { context, elements, spoken, events, canceled: () => canceled };
}

test('definition speech is opt-in and replaces rather than queues selections', () => {
  const s = setup();
  vm.runInContext("speakDefinition('First')", s.context);
  assert.equal(s.spoken.length, 0);
  s.elements['speak-definitions'].checked = true;
  vm.runInContext("speakDefinition('Original description')", s.context);
  assert.equal(s.spoken[0].text, 'Original description');
  vm.runInContext("speakDefinition('Next description')", s.context);
  assert.equal(s.canceled(), 1);
  assert.equal(s.spoken[1].text, 'Next description');
  s.spoken[0].onerror({ error: 'canceled' });
  assert.equal(s.elements['speech-status'].textContent, 'Browser speech notice');
  s.elements['speak-definitions'].checked = false;
  s.elements['speak-definitions'].onchange();
  assert.equal(s.canceled(), 2);
});

test('speech failures are visible and leaving the page cancels speech', () => {
  const s = setup();
  s.elements['speak-definitions'].checked = true;
  vm.runInContext("speakDefinition('Definition')", s.context);
  s.spoken[0].onerror({ error: 'voice-unavailable' });
  assert.match(s.elements['speech-status'].textContent, /voice-unavailable/);
  vm.runInContext("speakDefinition('Another definition')", s.context);
  s.events.pagehide();
  assert.equal(s.canceled(), 1);
});

test('unsupported browsers disable speech with an explicit text-only notice', () => {
  const s = setup(false);
  assert.equal(s.elements['speak-definitions'].disabled, true);
  assert.match(s.elements['speech-status'].textContent, /not supported/);
  vm.runInContext("speakDefinition('Definition')", s.context);
  assert.equal(s.spoken.length, 0);
});
