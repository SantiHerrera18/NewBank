import Loader from "../components/Loader/Loader";
import { useState, useEffect } from "react";
import MainHome from "../components/Home/MainHome";

const Home = () => {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirst(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return <div>{showFirst ? <Loader /> : <MainHome />}</div>;
};

export default Home;
