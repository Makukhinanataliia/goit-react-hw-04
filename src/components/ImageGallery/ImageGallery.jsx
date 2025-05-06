import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ImageGallery.module.css";
import ImageModal from "../ImageModal/ImageModal";

const ImageGallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul className={styles.gallery}>
        {images.map((image) => (
          <li
            key={image.id}
            className={styles.card}
            onClick={() => openModal(image)}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className={styles.image}
            />
          </li>
        ))}
      </ul>

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
        />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
        regular: PropTypes.string.isRequired,
      }),
      alt_description: PropTypes.string,
    })
  ).isRequired,
};

export default ImageGallery;
