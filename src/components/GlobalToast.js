import { ToastContainer, Zoom } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export default function GlobalToast({ position = "top-center", autoClose = 5000, hideProgressBar = false, newestOnTop = false, closeOnClick = false, rtl = false, pauseOnFocusLoss = true, draggable = true, pauseOnHover = true, transition = Zoom }) {
  const { theme } = useContext(ThemeContext);

  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
      transition={transition}
    />
  );
}
