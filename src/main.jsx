import "./index.css";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import store from "./store";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./pages/Main";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuthenticated } from "./store/slices/loginSlice";
import { changeModalStatus } from "./store/slices/modalSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utilis/ScrollToTop";
import { CartProvider } from "./hooks/useCart";
import ModalComponent from "./components/ModalCompo";
const root = ReactDOM.createRoot(document.querySelector("#root"));
function RenderCompo() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((bag) => bag.login);
  const modalStatus = useSelector((bag) => bag.modal).show;

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          dispatch(setAuthenticated(data.safeUser));
        } else {
          if (res.status === 401) {
                
            }
        }
      } catch (e) {
        toast.error("Switch on the server please");
      }
    }
    checkAuth();
  }, [dispatch]);

  return (
    <>
      {isAuthenticated ? (
        <CartProvider>
          <Main />
        </CartProvider>
      ) : (
        <Home />
      )}

  {modalStatus && <ModalComponent />}
    </>
  );
}
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<RenderCompo />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </BrowserRouter>
  </>
);
