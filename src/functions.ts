export const createErrorResponse = (status: number, message: string): any => {
  const errorResponse = {
    statusCode: status,
    body: JSON.stringify({ errorMessage: message }),
  };
  return errorResponse;
};

export const createSuccessResponse = (status: number, data: any): any => {
  const response = {
    statusCode: status,
    body: JSON.stringify({ data }),
  };
  return response;
};