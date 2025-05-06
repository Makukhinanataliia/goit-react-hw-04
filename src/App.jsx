import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "e_SarYMT-ml1r17R8SLj5LJw6uH_3NpXbYKJAS58DV4";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchImages = async (query) => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(API_URL, {
      params: {
        query,
        client_id: API_KEY,
        per_page: 12,
      },
    });
    setImages(response.data.results);
  } catch (error) {
    console.error("Error fetching images: ", error);
    setError("Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <SearchBar onSubmit={fetchImages} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}{" "}
      {!loading && !error && <ImageGallery images={images} />}
    </div>
  );
};

export default App;
