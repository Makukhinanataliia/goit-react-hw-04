import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ImageGallery.module.css";
import ImageModal from "../ImageModal/ImageModal";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.activeElement?.blur(); 
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul className={styles.gallery}>
        {images.map((image) => (
          <li key={image.id} className={styles.card}>
            <ImageCard image={image} onClick={() => openModal(image)} />
          </li>
        ))}
      </ul>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage?.urls?.regular}
        alt={selectedImage?.alt_description}
      />
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
