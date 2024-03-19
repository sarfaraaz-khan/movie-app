import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Header from "./components/headers/Header";
import Favorite from "./components/Faverotes/Favorite";
import WishList from "./components/watchList/WishList";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faverote" element={<Favorite />} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
