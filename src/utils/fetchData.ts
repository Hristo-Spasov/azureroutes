import axios, { AxiosError, AxiosResponse } from "axios";

interface FetchDataProps {
  url: string;
  options?: {
    method?: string;
    headers?: any;
  };
}

const fetchData = async <T>({
  url,
  options,
}: FetchDataProps): Promise<T | undefined> => {
  try {
    const method = options?.method || "GET";

    const response: AxiosResponse<T> = await axios.request<T>({
      url,
      method,
      headers: options?.headers,
      ...options,
    });

    const responeseData: T = response.data;

    return responeseData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.log("error message: ", error.message);
      throw axiosError;
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export default fetchData;
