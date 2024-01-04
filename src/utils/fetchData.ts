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
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data ${response.status} `);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log((e as Error).message);
    throw e;
  }
};

export default fetchData;
