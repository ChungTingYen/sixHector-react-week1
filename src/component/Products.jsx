/* eslint-disable react/prop-types */
import React from "react";

const Product = (props) => {
  const { id, title, origin_price, price, is_enabled, onGetProduct } = props;

  const atGetProduct = () => {
    // console.log("id=", id);
    onGetProduct(id);
  };

  return (
    <>
      {
        <tr>
          <th scope="row"><td>{title}</td></th>
          {/* <td>{title}</td> */}
          <td>{origin_price}</td>
          <td>{price}</td>
          <td>{is_enabled?'Y':'N'}</td>
          <td>
            <button className="btn btn-primary" onClick={atGetProduct}>
              查看細節
            </button>
          </td>
        </tr>
      }
    </>
  );
};

export default Product;
