import * as data from './words_dictionary.json';

class WordApi {
  /**
   * @param {Object} words
   */
  constructor(words) {
    this.words = words.default;
    this.length = this.words.length;
  }

  getWord() {
    return this.words[Math.floor(Math.random() * this.length)];
  }
}

const api = new WordApi(data);

export default api;
