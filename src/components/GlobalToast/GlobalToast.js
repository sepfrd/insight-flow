import { useTheme } from "@/hooks/useTheme";
import { ToastContainer, Zoom } from "react-toastify";

const GlobalToast = ({ position = "top-center", autoClose = 5000, hideProgressBar = false, newestOnTop = false, closeOnClick = false, rtl = false, pauseOnFocusLoss = true, draggable = true, pauseOnHover = true, transition = Zoom }) => {
  const { theme } = useTheme();

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
};

export default GlobalToast;
