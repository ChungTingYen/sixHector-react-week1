/* eslint-disable react/prop-types */
import React from "react";

const ProductDetail = (props) => {
  const {
    title,
    imageUrl,
    description,
    content,
    origin_price,
    price,
    imagesUrl,
    category,
  } = props;
  return (
    <>
      <div className="card mb-3" style={{ border: "none" }}>
        <img
          src={imageUrl}
          className="card-img-top primary-image"
          alt="主圖"
          style={{ width: "400px", height: "400px" }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}<span className="badge bg-primary ms-2">{category}</span>
          </h5>
          <p className="card-text">商品描述：{description}</p>
          <p className="card-text">商品內容：{content}</p>
          <div className="d-flex">
            <p className="card-text text-secondary">
              <del>{origin_price}</del>元 / {price} 元
            </p>
          </div>
          <h5 className="mt-3">更多圖片：</h5>
          <div className="d-flex flex-wrap">
            {imagesUrl.map((image, index) => (
              <img
                key={index}
                src={image}
                className="card-img-top primary-image me-2 mb-1"
                alt="`更多圖片${index}`"
                style={{ width: "250px", height: "250px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
