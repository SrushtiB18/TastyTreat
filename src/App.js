import { ChakraProvider } from "@chakra-ui/react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import NavBar from "./components/Navbar";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./screens/Cart";
import MyOrder from "./screens/MyOrder";
import theme from "./theme/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/signup"} element={<Signup />} />
            <Route exact path={"/my-cart"} element={<Cart />} />
            <Route exact path={"/my-order"} element={<MyOrder />} />
          </Routes>
        </Router>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
