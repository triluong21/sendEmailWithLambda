import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { mainProcess } from "./main";
import * as UtlFunctions from "./functions";

export const emailingHandler: Handler = async (event: APIGatewayEvent, context: Context, callback?: Callback) => {
  let response;
  try {
    const result = await mainProcess();
    if (result.status === "OK") {
      response = UtlFunctions.createSuccessResponse(200, result);
    } else {
      console.log("Send Email error: ", result.status);
      const errorMessage = "Send Email message failed. Message -808"
      response = UtlFunctions.createErrorResponse(500, errorMessage);
    }
    return response;
  } catch (error) {
    console.log("Try/Catch exception. Error: ", error);
    const errorMessage = "Unable to take request at this time. Message -809"
    response = UtlFunctions.createErrorResponse(500, errorMessage);
    return response;
  }
}
