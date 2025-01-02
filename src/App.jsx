import React,{ useState, useCallback, useEffect, useRef } from "react";
import { Products,ProductDetail,Loading,Modal } from './component';
import { getProductDatas } from "./utils/functions";

function App() {
  const [tempProduct, setTempProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const initRef = useRef(false);
  const [detailLoading,setDetailLoading] = useState('');
  const onGetProduct = useCallback(
    (productId) => {
      console.log('productId=',productId);
      if (tempProduct?.id === productId) { 
        // 當前選擇的產品與上一次相同，不進行任何操作
        console.log('產品ID相同，不重複打開模態框'); 
        return; 
      }
      const filterProduct = products.filter((product) => product.id === productId)[0] || [];
      setTempProduct(filterProduct);
      AppModalRef.current.open();
      AppModalRef.current.setModalImage(null);
      // console.log('open modal');
      setDetailLoading(productId);
      AppModalRef.current.toggleFooter(false);
      //這個方法也可以
      // AppModalRef.current.modalDivRef.current.querySelector(".modal-footer").style.display = 'none';
    },
    [products,tempProduct]
  );
  useEffect(() => {
    console.log("detailLoading=", detailLoading); 
    // console.log("tempProduct.length=", tempProduct.length); 
    if(detailLoading && Object.keys(tempProduct).length > 0){
      const timeId = setTimeout(() => {
        AppModalRef.current.close(); 
        // setDetailLoading(false);
        // console.log('timeId=',timeId);
      }, 3000);
      return ()=>clearTimeout(timeId);
    }
  },[detailLoading]);

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
  const AppModalRef = useRef(null);

  return (
    <>
      {/* <Modal ref={AppModalRef}></Modal> */}
      <Modal ref={AppModalRef} modalBodyText='商品細節載入中'
        modalSize={{ width: "200px", height: "200px" }}
        modalImgSize={{  width: "200px",height: "120px" }}/>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => AppModalRef.current.open()}
      >
        Open Modal
      </button>
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
