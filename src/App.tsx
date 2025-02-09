import { Route, Routes } from "react-router-dom";
import Hero from "./Hero";
import Home from "./Home";
import Desplay from "./Desplay";
import Video from "./Vedio";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/desplay" element={<Desplay />} />
        <Route path="/vedio" element={<Video />} />
      </Routes>
    </>
  );
}

export default App;
