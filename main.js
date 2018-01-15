"use strict";


const randomIntButton = document.getElementById('randomIntButton');
const frequency = document.getElementById('frequency');

class Sound {

  constructor(context) {
    this.context = context;
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  play(value, time) {
    this.init();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
            
    this.oscillator.start(time);
    this.stop(time);

  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.100, time + 1);
    this.oscillator.stop(time + 1);
  }
}

let context = new (window.AudioContext || window.webkitAudioContext)();

randomIntButton.addEventListener('click', function() {
			let note = new Sound(context);
			let now = context.currentTime;
			let randomInt = Math.round(Math.random() * 600);
			note.play(261.63, now);
			note.play(randomInt, now + 1);
			frequency.innerHTML = "<p>" + randomInt + "</p>";
});
