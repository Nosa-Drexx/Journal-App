import { useRef } from "react";
import { useEffect } from "react";
import "./modal.scss";

function Modal({ text, completeAction, terminateAction }) {
  const modal = useRef(null);

  //disables scroll on page when modal is open(when components first mount) and enables page scroll when modal is closed (when component is about to unmount)
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    if (modal.current) {
      modal.current.style.top = `${0 + window.scrollY}px`;
    }
  }, [modal]);
  return (
    <div ref={modal} className="modal">
      <div className="modal-container">
        <div className="modal-text">
          {text}
          <br />
          <br />
          This Action can&apos;t be undone.
        </div>
        <div className="modal-btn">
          <button
            className="yes"
            onClick={() => {
              completeAction();
              terminateAction(false);
            }}
          >
            YES
          </button>
          <button className="no" onClick={() => terminateAction(false)}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
