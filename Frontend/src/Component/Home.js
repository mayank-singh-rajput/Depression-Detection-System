import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useLocation } from "react-router-dom";

import QuestionCard from "./Question";


function DepressionStatus(props){
  if(props >= 0 && props<=4){
    return "Minimal Depression"
  }
  else if(props>4 && props<=12){
    return "Mild Depression"
  }
  else if(props>12 && props<=22){
    return "Moderate Depression"
  }
  else if(props>22 && props<=32){
    return "Moderately Severe Depression"
  }
  else if(props>32){
    return "Severe Depression"
  }
};


const Home = () => {
  const [QuestionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [AgeRange, setAgeRange] = useState('');

  const location = useLocation()
  console.log("Location state", location.state);
  
  useEffect(() => {
    setAgeRange(location.state.AgeRange);
  }, [location])

  useEffect(() => {
    // console.log('Age runage while fetch ', AgeRange);
    Axios.get(`http://localhost:5000/api/question/${AgeRange}`).then((response) => {
      setQuestionList(response.data);
      console.log(response.data);
    });
  }, [AgeRange])

  const getDepressionLevel = () => QuestionList.reduce((prev, cur) => {
    if(cur.selected) return prev + Number(cur.selected);
    return prev;
  }, 0)
  

  return (
    <div className="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif text-center">
      <h1 className="text-6xl font-bold">Depression Detection System</h1>

      <div className="">

        {QuestionList.length > 0 
        ? <QuestionCard question={QuestionList[currentIndex]} setSelected={(val) => {
          let newList = [...QuestionList];
          newList[currentIndex].selected = val;
          setQuestionList(newList);
        }} />
        : "Question list empty!"}
        
        <div className="p-5 m-10 align-centre">
        <button className="w-[50%] box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
          onClick={() => setCurrentIndex(currentIndex - 1)} 
          hidden={currentIndex === 0 || currentIndex === QuestionList.length}
        >Prev</button>

        <button className="w-[50%] box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          hidden={currentIndex === QuestionList.length - 1}
        >Next</button>

        <button className="w-[50%] box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500" 
        hidden={currentIndex < QuestionList.length-1}>
          <Link to="/detail" state={{ DepressionLevel: getDepressionLevel(), DepressionStatus: DepressionStatus(getDepressionLevel()) }} style={{ textDecoration: 'none' }}> Submit </Link>
        </button>
        </div>
      </div>

      <p> DepressionLevel: {getDepressionLevel()}</p>

      <p> DepressionStatus: {DepressionStatus(getDepressionLevel())} </p>

    </div>
  );
};

export default Home;
