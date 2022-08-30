export const typedCatchHandler = (
  error: any | unknown,
  callback: (message: string) => void,
  sliceName = "sliceName",
) => {
  if (error instanceof Error) {
    console.log(`${sliceName} catch error:`, error.message);

    return callback(error.message);
  }
};
