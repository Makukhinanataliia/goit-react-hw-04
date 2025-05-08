import { useState } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "N-2VUjJv3L-KpqRWhohRAuuJLYj3ASs7WT6XS4X-UKI";

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (query, newSearch = false) => {
    setLoading(true);
    setError(null);

    try {
      const currentPage = newSearch ? 1 : page;

      const response = await axios.get(API_URL, {
        params: {
          query,
          page: currentPage,
          client_id: API_KEY,
          per_page: 12,
        },
      });

      const fetchedImages = response.data.results;
      const total = response.data.total;

      if (newSearch) {
        setImages(fetchedImages);
        setPage(2);
      } else {
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
        setPage((prevPage) => prevPage + 1);
      }

      setTotalPages(Math.ceil(total / 12));
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    fetchImages(query, true);
  };

  const handleLoadMore = () => {
    fetchImages(searchQuery);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {!loading && images.length > 0 && page <= totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={true}
          onClose={closeModal}
          imageUrl={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
        />
      )}
    </div>
  );
};

export default App;
