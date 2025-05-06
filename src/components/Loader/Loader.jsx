// src/components/Loader/Loader.jsx
import React from "react";
import ClipLoader from "react-spinners/ClipLoader"; 
import styles from "./Loader.module.css"; 

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <ClipLoader color="#000" size={50} />
    </div>
  );
};

export default Loader;
