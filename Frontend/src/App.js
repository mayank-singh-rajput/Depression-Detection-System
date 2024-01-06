import { Routes,  Route } from "react-router-dom";

import Detail from "./Component/Detail";
import Home from "./Component/Home";
import PopUp from "./Component/popup";
// import Chart from "./Component/Chart";
// import SendEmail from "./Component/SendEmail";
// import Map from "./Component/Map"
// import Contact from "./Component/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PopUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail" element={<Detail/>} />
        {/* <Route path="/chart" element={<Chart/>} />
        <Route path="/map" element={<Map/>} />
        <Route path="/sendEmail" element={<SendEmail/>} />
        <Route path="/contact" element={<Contact/>} /> */}
      </Routes>
    </>
  );
}

export default App;
