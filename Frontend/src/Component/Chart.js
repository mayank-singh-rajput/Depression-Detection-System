import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";


function Charts() {
    const[ChartListAge, setChartListAge] = useState([])
    const[ChartListStatus, setChartListStatus] = useState([])

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/add/age').then((response) => {
      setChartListAge(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/add/status').then((response) => {
      setChartListStatus(response.data);
      console.log(response.data);
    });
  }, []);


const dataAge = (() => {
  let t = [["Age", "Depression Count"]];
  ChartListAge.forEach(c => t.push([c.Data, c.DepressionLevel]))
  return t;
})();

const dataStatus = (() => {
  let a = [["DepressionStatus", "Depression Count"]];
  ChartListStatus.forEach(m => a.push([m.DepressionStatus, m.DepressionLevel]))
  return a;
})();


const optionAge = {
    title: "On The Basis of Age",
  };

const optionStatus = {
    title: "On The Basis of Depression Status",
  };
  

return (
    <div className="grid grid-cols-2 divide-x">
      <Chart
        chartType="PieChart"
        data={dataAge}
        options={optionAge}
        width={"100%"}
        height={"400px"}
      />
    
      <Chart
        chartType="PieChart"
        data={dataStatus}
        options={optionStatus}
        width={"100%"}
        height={"400px"}
      />
    
    </div>
  );

}

export default Charts;