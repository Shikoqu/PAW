import { useNavigate } from "react-router-dom";

function Modal({ children }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/40 z-50"
        onClick={handleClose}
      />
      <dialog
        open
        className="border-none rounded-xl shadow-md p-0 overflow-hidden z-50"
      >
        {children}
      </dialog>
    </>
  );
}

export default Modal;
