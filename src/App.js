import { useEffect } from "react";
import MainSection from "./components/MainSection";
import MidSection from "./components/MidSection";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const url = "https://partner.imwallet.in/web_services/statudentFilter.jsp";
  const calledUrl = `https://cors-anywhere.herokuapp.com/https://partner.imwallet.in/web_services/statudentFilter.jsp/`;

  const fetchData = async () => {
    const response = await axios.get(calledUrl).catch((error) => {
      console.log(error, "error");
    });
    console.log(response, "respomse");

    // const res = await axios(url, {
    //   method: "GET",
    //   mode: "no-cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true,
    //   credentials: "same-origin",
    // }).then((response) => {
    //   console.log(response);
    // });
    // console.log(res, "res");
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <MidSection />
      <MainSection />
    </>
  );
}

export default App;
