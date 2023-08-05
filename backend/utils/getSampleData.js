/**
 * This function returns sample data for development. This is not being used right now.
 * It checks if the environment is not production, then it returns sample data, else it returns nothing.
 * @deprecated Seriously!?
 * @example getSampleData(); // { quote: 'Hello World!', list: [ 'Namaste', 'Hallo', 'Bonjour', 'Hola', 'Ciao' ], randomNumber: 42 }
 * @memberof module:utils
 * @returns {Object} sample data.
 */
const getSampleData = () => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  /**
   * @type {Object}
   * @property {String} quote - A random quote.
   * @property {Array} list - A list of greetings in different languages.
   * @property {Number} randomNumber - A random number between 0 and 100.
   */
  const sampleData = {
    quote: "Hello World!",
    list: ["Namaste", "Hallo", "Bonjour", "Hola", "Ciao"],
    randomNumber: Math.floor(Math.random() * 100),
  };
  return sampleData;
};

module.exports = { getSampleData };
