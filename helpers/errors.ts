export const throwError = (message: string) => {
  const error = new Error(message);
  throw error;
};

export const errorHandler = (err: unknown) => {
  const errorMessage = (err as Error).message || 'Unknown Error';
  console.log(errorMessage);
};
