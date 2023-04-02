import React from "react";
import loaderImg from "../../assets/img/loader-img.svg";
import style from "./loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div>
      <img src={loaderImg} alt="preLoader" />
    </div>
  );
};

export default Loader;
