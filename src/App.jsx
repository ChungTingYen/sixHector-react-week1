import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import Products from "./component/Products";
import ProductDetail from "./component/ProductDetail";
import Loading from "./component/Loading";
import Modal from "./component/Modal";
import { getProductDatas } from "./utils/functions";
import * as bootstrap from "bootstrap";

function App() {
  const [tempProduct, setTempProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const initRef = useRef(false);
  const onGetProduct = useCallback(
    (productId) => {
      const filterProduct =
        products.filter((product) => product.id === productId)[0] || [];
      setTempProduct(filterProduct);
    },
    [products]
  );
  // useEffect(() => {
  //   console.log("isLoading=", isLoading);
  // });

  useEffect(() => {
    const fetchProductDatas = async () => {
      console.time("fetchProductDatas");
      try {
        const productDatas = await getProductDatas(2000);
        initRef.current = true;
        setProducts(productDatas);
      } catch (error) {
        console.log("error:", error);
      }
      console.timeEnd("fetchProductDatas");
    };
    fetchProductDatas();
  }, []);
  // const modalDivRef = useRef(null);
  const modalRef = useRef(null);

  // useEffect(() => {
  //   modalRef.current = new bootstrap.Modal(modalDivRef.current);
  //   // modalRef.current.show();
  //   const handleHidden = () => {
  //     document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  //     // 手動重置下拉選單狀態
  //     const dropdowns = document.querySelectorAll(".dropdown-toggle");
  //     dropdowns.forEach((dropdown) => {
  //       new bootstrap.Dropdown(dropdown).dispose();
  //       new bootstrap.Dropdown(dropdown);
  //     });
  //   };
  //   const modalElement = document.getElementById("myModal");
  //   modalElement.addEventListener("hidden.bs.modal", handleHidden);
  //   return () => {
  //     modalElement.removeEventListener("hidden.bs.modal", handleHidden);
  //   };
  // }, []);
  return (
    <>
      {/* <Modal></Modal> */}
      {/* <Modal ref={modalRef}></Modal> */}
      {/* {isLoading && <Modal ref={modalRef} />} */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => modalRef.current.open()}
      >
        Open Modal
      </button>
      {/* <button
        type="button"
        className="btn btn-secondary"
        onClick={() => modalRef.current.close()}
      >
        Close Modal
      </button> */}
      {/* <div
        className="modal fade"
        id="myModal"
        ref={modalDivRef}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {initRef.current ? (
        <div className="row mt-5 mb-5 mx-3">
          <div className="col-md-6 mb-3">
            <h2>產品列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>產品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th>查看細節</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <Products
                    key={item.id}
                    {...item}
                    onGetProduct={onGetProduct}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <h2>單一產品細節</h2>
            {tempProduct ? (
              <ProductDetail
                title={tempProduct.title}
                imageUrl={tempProduct.imageUrl}
                description={tempProduct.description}
                content={tempProduct.content}
                origin_price={tempProduct.origin_price}
                price={tempProduct.price}
                imagesUrl={tempProduct.imagesUrl}
                category={tempProduct.category}
              />
            ) : (
              <p className="text-secondary">請選擇一個商品查看</p>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
