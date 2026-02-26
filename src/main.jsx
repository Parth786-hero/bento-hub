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
const root = ReactDOM.createRoot(document.querySelector("#root"));
function RenderCompo() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((bag) => bag.login);
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
            setTimeout(() => {
              dispatch(changeModalStatus({ show: true, mode: "LOG_IN" }));
            }, 5000);
          }
        }
      } catch (e) {
        toast.error("Switch on the server please");
      }
    }
    checkAuth();
  }, []);

  return isAuthenticated ? (
    <CartProvider>
      <Main />
    </CartProvider>
  ) : (
    <Home />
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
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </>
);
