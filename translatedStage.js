module.exports.translatedStage = (serverless) => {
  const stage = serverless.processedInput.options.stage;
  let translated = "";
  switch (stage) {
    case "dev":
      translated = "test-";
      break;
    case "qa":
      translated = "qa-";
      break;
    case "ba":
      translated = "ba-";
    case "prod":
      translated = "";
      break;
    default:
      translated = stage + "-";
      break;
  }
  return translated;
}