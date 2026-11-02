const screenTimer = document.getElementById("screen-timer");

class Timer {
  timeoutId = null; // Number;
  seconds = 20; // Number;
  minutes = 0; // Number;
  active = true;

  element; // HTML Element Type

  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * @function {void}
   */
  async main() {
    while (this.active && (this.minutes >= 0 || this.seconds >= 0)) {
      if (this.seconds === 0 && this.minutes >= 0) {
        this.minutes--;
        this.seconds = 59;
      }
      if (this.minutes < 0) {
        this.stop();
      }

      for (let i = this.seconds; i >= 0; i--) {
        if (!this.active) break;

        this.seconds = i;
        this.updateDisplay();

        if (i >= 0) {
          await this.#waitTime(1000);
        }
      }
    }
    this.active = false;
  }

  /**
   * @function {void}
   */
  updateDisplay() {
    const minStr = String(this.minutes).padStart(2, "0");
    const secStr = String(this.seconds).padStart(2, "0");

    if (this.element) {
      this.element.innerText = `${minStr}:${secStr}`;
    }
  }

  /**
   * @param {Number} id
   */
  stop() {
    this.active = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  /**
   * @param {Number} ms
   */
  #waitTime(ms) {
    return new Promise((resolve) => {
      this.timeoutId = setTimeout(resolve, ms);
    });
  }
}

let timer = new Timer(screenTimer);

(async () => {
  await timer.main();
})();
