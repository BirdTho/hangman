import * as data from './words_dictionary.json';
const words: string[] = ((data as any).default as string[]);

class WordApi {
  words: string[];
  length: number;

  /**
   * @param {Object} words
   */
  constructor(words: string[]) {
    this.words = words;
    this.length = this.words.length;
  }

  getWord() {
    return this.words[Math.floor(Math.random() * this.length)];
  }
}

const api = new WordApi(words);

export default api;
