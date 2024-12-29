import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import Products from "./component/Products";
import ProductDetail from "./component/ProductDetail";
import Loading from "./component/Loading";
import { getProductDatas } from "./utils/functions";
import "./App.css";

function App() {
  const [tempProduct, setTempProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
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
  //   console.log("temp=", products);
  // }, [products]);

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

  return (
    <>
      {initRef.current ? (
        <div className="row mt-5">
          <div className="col-md-6">
            <h2>產品列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>產品名稱</th>
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
