import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import { Chart } from "react-google-charts";

function Detail() {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [DepressionLevel, setDepressionLevel] = useState("");
  const [DepressionStatus, setDepressionStatus] = useState("");
  const [DepressionList, setDepressionList] = useState([]);

  const [newAge, setNewAge] = useState("");

  const location = useLocation();
  console.log("Location state", location.state);

  useEffect(() => {
    setDepressionLevel(location.state.DepressionLevel);
    setDepressionStatus(location.state.DepressionStatus);
  }, [location]);

  useEffect((Name) => {
    Axios.get(`http://localhost:4000/api/select/${Name}`).then((response) => {
      setDepressionList(response.data);
      console.log(response.data);
    });
  }, []);

  const SubmitDepression = () => {
    Axios.post("http://localhost:4000/api/insert", {
      Name: Name,
      Age: Age,
      DepressionLevel: DepressionLevel,
      DepressionStatus: DepressionStatus,
    }).then(() => {
      alert("Successfully Detected.....");
    });

    setDepressionList([
      ...DepressionList,
      {
        Name: Name,
        Age: Age,
        DepressionLevel: DepressionLevel,
        DepressionStatus: DepressionStatus,
      },
    ]);
  };

  const DeleteData = (Name) => {
    Axios.delete(`http://localhost:4000/api/delete/${Name}`);
  };

  const UpdateAge = (Name) => {
    Axios.put("http://localhost:4000/api/update", {
      Name: Name,
      Age: newAge,
    });
    setNewAge("");
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fmstmk8",
        "template_i3opwlp",
        form.current,
        "FKWFlB9oD77g5Y6Ps"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("SUCCESS!");
        },
        (error) => {
          console.log(error.text);
          alert("FAILED...", error);
        }
      );
  };

  const [ChartListAge, setChartListAge] = useState([]);
  const [ChartListStatus, setChartListStatus] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/add/age").then((response) => {
      setChartListAge(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/add/status").then((response) => {
      setChartListStatus(response.data);
      console.log(response.data);
    });
  }, []);

  const dataAge = (() => {
    let t = [["Age", "Depression Count"]];
    ChartListAge.forEach((c) => t.push([c.Data, c.DepressionLevel]));
    return t;
  })();

  const dataStatus = (() => {
    let a = [["DepressionStatus", "Depression Count"]];
    ChartListStatus.forEach((m) =>
      a.push([m.DepressionStatus, m.DepressionLevel])
    );
    return a;
  })();

  const optionAge = {
    title: "On The Basis of Age",
  };

  const optionStatus = {
    title: "On The Basis of Depression Status",
  };

  return (
    <div className="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif text-center">
      <h1 className="text-6xl font-bold">Depression Detection System</h1>

      <div className="m-16">
        <div>
          <label className="text-2xl font-bold"> Name: </label>
          <input
            className="w-80 pt-2 pb-2 pl-5 pr-5 m-5 box-border border-4 border-red-500 rounded-full"
            type="text"
            name="Name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div>
          <label className="text-2xl font-bold"> Age: </label>
          <input
            className="w-80 pt-2 pb-2 pl-5 pr-5 mb-10 ml-5 box-border border-4 border-red-500 rounded-full"
            type="text"
            name="Age"
            required
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>

        <button
          className="w-96 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
          onClick={SubmitDepression}
        >
          {" "}
          Submit{" "}
        </button>


        <br />
        <p className="font-serif text-2xl mt-16">
          For Testing Depression Through Face Camera:
        </p>
        <br />
        <button className="w-[50%] border-4 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500">
          <a href="http://127.0.0.1:5500/index.html" target="_blank">
            CAMERA DETECTION
          </a>
        </button>


        {DepressionList.map((val, inx) => {
          return (
            <div
              className="box-border border-4 p-5 m-10 border-gray-400 rounded-full"
              key={inx}
            >
              <h1 className="text-2xl font-bold"> Name: {val.Name} </h1>
              <p className="text-xl font-bold"> Age: {val.Age} </p>
              <p className="text-lg font-medium">
                {" "}
                DepressionLevel: {val.DepressionLevel}{" "}
              </p>
              <p className="text-lg font-medium">
                {" "}
                DepressionStatus: {val.DepressionStatus}{" "}
              </p>

              <button
                className="w-fit m-10 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
                onClick={() => {
                  DeleteData(val.Name);
                }}
              >
                {" "}
                Delete{" "}
              </button>

              <input
                className="w-40 pt-2 pb-2 pl-5 pr-5 m-10 box-border border-4 border-red-500 rounded-full container mx-auto"
                text="text"
                onChange={(e) => {
                  setNewAge(e.target.value);
                }}
              />

              <button
                className="w-fit m-10 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
                onClick={() => {
                  UpdateAge(val.Name);
                }}
              >
                {" "}
                Update{" "}
              </button>
            </div>
          );
        })}

        <p className="font-serif text-lg m-24">
          Your responses indicate that you may be at risk of harming yourself.
          If you need immediate help, you can reach the Suicide & Crisis
          Lifeline by calling or texting 988 or using the chat box at
          <a
            href="https://988lifeline.org/"
            className="text-red-800 underline decoration-pink-500"
          >
            {" "}
            988lifeline.org{" "}
          </a>
          . You can also text{" "}
          <a className="text-red-800 underline decoration-pink-500">
            {" "}
            “DEPRESSED”{" "}
          </a>
          to{" "}
          <a className="text-red-800 underline decoration-pink-500">
            {" "}
            123-123{" "}
          </a>{" "}
          to reach the Crisis Text Line. Warmlines are an excellent place for
          non-crisis support.
          <br />
          <br />
          Your results indicate that you may be experiencing signs of{" "}
          {DepressionStatus}.
          <br />
          These results are not meant to be a diagnosis. You can meet with a
          doctor or therapist to get a diagnosis and/or access therapy or
          medications. Sharing these results with someone you trust can be a
          great place to start.
        </p>
      </div>

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

      <div className="relative h-[20rem] ml-20 mr-20 mt-40 border-4 border-gray-400 bg-blue-500 mx-auto rounded-t-[1rem]">
        <footer className="relative w-fit pt-8 pb-8 pl-4 pr-4 left-20 bottom-20 bg-gray-100 border-4 border-red-400 bg-Stone-400 rounded-[3rem]">
          <form ref={form} onSubmit={sendEmail}>
            <label className="text-2xl font-bold pd-t-[20px]">Email: </label>{" "}
            <br />
            <input
              className="w-80 pt-2 pb-2 pl-5 pr-5 m-5 box-border border-4 border-red-500 rounded-full"
              type="email"
              name="to_email"
            />
            <br />
            <label className="text-2xl font-bold pd-t-[20px]">
              PhoneNo (Optional):{" "}
            </label>{" "}
            <br />
            <input
              className="w-80 pt-2 pb-2 pl-5 pr-5 m-5 box-border border-4 border-red-500 rounded-full"
              type="phone"
              name="PhoneNo"
            />
            <input type="text" name="Name" value={Name} hidden readOnly />
            <input type="text" name="Age" value={Age} hidden readOnly />
            <input
              name="DepressionLevel"
              value={DepressionLevel}
              hidden
              readOnly
            />
            <input
              name="DepressionStatus"
              value={DepressionStatus}
              hidden
              readOnly
            />
            <br />
            <button
              type="submit"
              value="Send"
              className="w-52 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
            >
              {" "}
              Send{" "}
            </button>
          </form>
        </footer>

        <footer className="absolute inset-y-0 top-10 right-20 w-fit font-serif text-lg">
          <a className="font-bold text-2xl"> Contact Us: </a> <br />
          Mayank Depression Research Centre <br />
          Chandigarh - 121121 <br />
          Board Number : +91-11-24554200 / 25846100 <br />
          Fax : +91-11-12345678 / 87654321 <br />
          E-mail Addresses: mayanksingh1913@gmail.com <br />
          <a
            href="https://goo.gl/maps/ruXyHAX5tVaAhHik6"
            target="_blank"
            className="text-red-800 underline decoration-pink-500"
          >
            {" "}
            MDRC Interactive Map{" "}
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Detail;

// {/* <button className="w-96 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500">
//       <Link to="/chart">
//         Chart </Link>
//       </button> */}

//         {/* <button className="w-96 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500">
//           <Link to="/contact" state={{ Name: Name, Age: Age, DepressionLevel: DepressionLevel, DepressionStatus: DepressionStatus }} style={{ textDecoration: 'none' }}>
//           EmailResult </Link>
//         </button> */}

//         {/* <button className="w-96 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500">
//           <Link to="/map">
//           Map </Link>
//         </button> */}
