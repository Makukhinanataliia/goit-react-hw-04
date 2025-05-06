import axios from "axios";

const ACCESS_KEY = "e_SarYMT-ml1r17R8SLj5LJw6uH_3NpXbYKJAS58DV4";

const instance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const searchPhotos = async (query, page = 1, perPage = 12) => {
  const response = await instance.get("/search/photos", {
    params: {
      query,
      page,
      per_page: perPage,
    },
  });

  return response.data;
};
