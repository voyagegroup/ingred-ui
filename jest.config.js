module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*)\\.test\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
};
