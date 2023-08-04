const getSampleData = () => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  const sampleData = {
    quote: "Hello World!",
    list: ["Namaste", "Hallo", "Bonjour", "Hola", "Ciao"],
    randomNumber: Math.floor(Math.random() * 100),
  };
  return sampleData;
};

module.exports = { getSampleData };
