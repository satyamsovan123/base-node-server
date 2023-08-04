const logger = (data) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log("-->");
  console.log(data);
  console.log("<--");
};

module.exports = { logger };
