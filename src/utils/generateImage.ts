interface GeneratedImageResponse {
  url: string;
}

interface SuccessResponse {
  data: GeneratedImageResponse[];
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

export const generateImage = async (searchString: string) => {
  try {
    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: searchString,
          n: 1,
          size: '256x256',
        }),
      }
    );
    const data = (await response.json()) as SuccessResponse & ErrorResponse;
    if (data.data) {
      return data.data[0].url;
    } else if (data.error) {
      throw new Error(data.error.message);
    } else {
      throw new Error('Something went wrong while generating your image');
    }
  } catch (e: unknown) {
    throw new Error(e as string);
  }
};
