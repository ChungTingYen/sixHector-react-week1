/* eslint-disable react/display-name */
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

const Modal = forwardRef((props, ref) => {
  const modalDivRef = useRef(null);
  const modalRef = useRef(null);
  const initRef = useRef(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (initRef.current) {
      modalRef.current = new bootstrap.Modal(modalDivRef.current);
      initRef.current && modalRef.current.show();
      const handleHidden = () => {
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        // 手動重置下拉選單狀態
        const dropdowns = document.querySelectorAll(".dropdown-toggle");
        dropdowns.forEach((dropdown) => {
          new bootstrap.Dropdown(dropdown).dispose();
          new bootstrap.Dropdown(dropdown);
        });
      };
      const modalElement = document.getElementById("myModal");
      modalElement.addEventListener("hidden.bs.modal", handleHidden);
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, [imageSrc]);

  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.show();
      },
      close() {
        modalRef.current.hide();
      },
      setImage(src) {
        setImageSrc(src);
        initRef.current = true;
      },
    };
  });
  return (
    <>
      <div
        className="modal fade"
        id="myModal"
        ref={modalDivRef}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: "600px", maxHeight: "600px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                商品放大圖
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body d-flex justify-content-center align-items-center"
              style={{ height: "500px" }}
            >
              <img
                src={imageSrc}
                className="img-fluid"
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default Modal;
