import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Map from "./Map";
// import 'reactjs-popup/dist/index.css';

const PopUp = () => {
  const [AgeRange, setAgeRange] = useState("");
  const [First_Name, setFirst_Name] = useState("");
  const [Last_Name, setLast_Name] = useState("");
  const [email, setemail] = useState("");
  const [Phone_No, setPhone_No] = useState("");
  const [AppointmentList, setAppointmentList] = useState([]);

  const TakeAppointment = () => {
    Axios.post("http://localhost:9000/api/insert", {
      First_Name: First_Name,
      Last_Name: Last_Name,
      email: email,
      Phone_No: Phone_No,
    }).then(() => {
      alert("Successfully Insert.....");
    });

    setAppointmentList([
      ...AppointmentList,
      {
        First_Name: First_Name,
        Last_Name: Last_Name,
        email: email,
        Phone_No: Phone_No,
      },
    ]);
  };

  return (
    <div className="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif text-center">
      <h1 className="text-6xl font-bold">Depression Detection System</h1>

      <Popup
        trigger={
          <button className="w-[50%] border-4 mt-20 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500">
            START TESTING DEPRESSION
          </button>
        }
      >
        <div className="relative border-4 m-2 pt-10 pb-5 pl-32 pr-32 rounded-full border-gray-500 mx-auto bg-gray-200">
          <h1 className="pl-5 text-3xl font-bold">Choose your Age: </h1>
          <div className="font-medium flex items-center justify-center">
            <ul className="grid grid-cols-2 divide-x gap-x-10 gap-y-4 p-5 m-5">
              <label>
                {" "}
                <li
                  className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${
                    AgeRange == 1 ? "bg-lime-500" : "bg-white"
                  }`}
                >
                  <input
                    name="input_5"
                    type="radio"
                    value={1}
                    onChange={(e) => setAgeRange(e.target.value)}
                    checked={AgeRange == 1}
                  />
                  0 - 25
                </li>{" "}
              </label>

              <label>
                {" "}
                <li
                  className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${
                    AgeRange == 2 ? "bg-lime-500" : "bg-white"
                  }`}
                >
                  <input
                    name="input_5"
                    type="radio"
                    value={2}
                    onChange={(e) => setAgeRange(e.target.value)}
                    checked={AgeRange == 2}
                  />
                  25 - 50
                </li>{" "}
              </label>

              <label>
                {" "}
                <li
                  className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${
                    AgeRange == 3 ? "bg-lime-500" : "bg-white"
                  }`}
                >
                  <input
                    name="input_5"
                    type="radio"
                    value={3}
                    onChange={(e) => setAgeRange(e.target.value)}
                    checked={AgeRange == 3}
                  />
                  50 - 75
                </li>{" "}
              </label>

              <label>
                {" "}
                <li
                  className={`p-2 border-separate border-spacing-2 border border-slate-500 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-500 ${
                    AgeRange == 4 ? "bg-lime-500" : "bg-white"
                  }`}
                >
                  <input
                    name="input_5"
                    type="radio"
                    value={4}
                    onChange={(e) => setAgeRange(e.target.value)}
                    checked={AgeRange == 4}
                  />
                  75 - 100
                </li>{" "}
              </label>
            </ul>
          </div>

          <button
            className="w-[50%] ml-[25%] mb-2 border-4 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
            hidden={""}
          >
            <Link
              to="/home"
              state={{ AgeRange: AgeRange }}
              style={{ textDecoration: "none" }}
            >
              {" "}
              Submit{" "}
            </Link>
          </button>
        </div>
      </Popup>

      <div>
        <p className="font-serif text-lg m-24">
          <b className="text-4xl text-lime-600">What is depression?</b>
          <br />
          Depression is a state of low mood that can persist for weeks or
          months. The symptoms of depression interfere with daily life and are
          often present during adolescence and young adulthood but may not be
          diagnosed until adulthood. As of 2019, The National Center for Health
          Statistics reports that 4.7% of U.S. adults over 18 years of age have
          regular feelings of depression.
          <br />
          <br />
          <b className="text-4xl text-lime-600">
            What are the main signs and symptoms of depression?
          </b>
          <br />
          The symptoms of depression vary widely, such as sleeping too much or
          too little. This is one reason why diagnosing depression can be a
          challenge. Other symptoms include lost interest in favorite
          activities, feeling hopeless, and under-or overeating. Symptoms may
          also vary by sex. For example, men with depression report higher rates
          of anger, aggression, substance use, and risk-taking compared to
          women.
          <br />
          <br />
          <b className="text-4xl text-lime-600">How is depression diagnosed?</b>
          <br />
          Depression is diagnosed by a healthcare provider who usually uses
          questionnaires that assess symptom severity. For more information on
          diagnosing depression, please refer to the American Psychiatric
          Association.
          <br />
          <br />
          <b className="text-4xl text-lime-600">
            What are some of the main medical treatments for depression?
          </b>
          <br />
          Today, antidepressants (chiefly SSRIs and SNRIs) are still the
          first-line treatment for depression, but their effects vary across
          individuals, so one may need to try different antidepressants to find
          the correct one. Talk therapy is usually used in conjunction with
          antidepressants. If antidepressants fail to improve symptoms, brain
          stimulation therapies such as electroconvulsive therapy and
          transcranial magnetic stimulation can be effective tools for
          medication-resistant depression.
          <br />
          <br />
          <b className="text-4xl text-lime-600">
            How could diet affect depression?
          </b>
          <br />
          It appears that a Mediterranean diet or a diet consisting of foods
          with a low Dietary Inflammatory Index (DII) has been associated with a
          reduced risk of depression. However, more research is needed before a
          specific diet can be recommended. With that being said, current
          research suggests that improving one's diet by replacing "junk" foods
          with nutrient-dense, higher fiber foods, such as vegetables, fruits,
          whole grains, and nuts reduce the risk and symptoms of depression.
          <br />
          <br />
          <b className="text-4xl text-lime-600">
            Have any supplements been studied for depression?
          </b>
          <br />
          If you are using an antidepressant, consult your physician before
          taking any supplement, as cases of harmful interactions between
          certain supplements and antidepressants have been reported (e.g.,
          between S-Adenosylmethionine and clomipramine). <br />
          With that in mind, several supplements and herbal remedies have been
          examined for depression including fish oil, saffron, curcumin, and
          zinc. Note that St. John’s Wort can adversely interact with many
          pharmaceuticals, including some antidepressants.
          <br />
          <br />
          <b className="text-4xl text-lime-600">
            Are there any other treatments for depression?
          </b>
          <br />
          Although alternative treatments such as acupuncture, herbal medicines,
          and meditation are commonly used for depression, it is not recommended
          to use alternative medical treatments without seeking approval from a
          healthcare professional.
          <br />
          <br />
          <b className="text-4xl text-lime-600">What causes depression?</b>
          <br />
          The causes of depression are complex, including prenatal factors,
          genetics, environment, biology, age, and sociocultural and
          psychological factors.
        </p>

        <p className="font-serif text-lg m-24">
          <b className="text-2xl text-red-600">Please note: </b>
          Online screening tools are not diagnostic instruments. You are
          encouraged to share your results with a physician or healthcare
          provider. Mayank Depression Research Centre Inc., sponsors, partners,
          and advertisers disclaim any liability, loss, or risk incurred as a
          consequence, directly or indirectly, from the use and application of
          these screens
        </p>
      </div>

      <div className="h-[30rem] relative bg-lime-600 mt-[180px]">
        <div className="relative w-fit pt-8 pb-8 pl-4 pr-4 left-20 bottom-20 bg-gray-100 border-4 border-red-500 bg-Stone-400 rounded-[2rem]">
          <p className="text-2xl font-bold">Take Online Appointment: </p>
          {/* <form> */}
            <label className="text-xl font-bold">First Name: </label>
            <input
              className="w-[50%] pt-2 pb-2 pl-5 pr-5 m-4 box-border border-4 border-red-500 rounded-full"
              type="text"
              name="First_Name"
              required
              onChange={(e) => {
                setFirst_Name(e.target.value);
              }}
            />

            <br />

            <label className="text-xl font-bold">Last Name: </label>
            <input
              className="w-[50%] pt-2 pb-2 pl-5 pr-5 m-4 box-border border-4 border-red-500 rounded-full"
              type="text"
              name="Last_Name"
              required
              onChange={(e) => {
                setLast_Name(e.target.value);
              }}
            />

            <br />

            <label className="text-xl font-bold">Email: </label>
            <input
              className="w-[50%] pt-2 pb-2 pl-5 pr-5 ml-16 mr-4 mb-4 mt-4 box-border border-4 border-red-500 rounded-full"
              type="text"
              name="email"
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <br />

            <label className="text-xl font-bold">PhoneNo: </label>
            <input
              className="w-[50%] pt-2 pb-2 pl-5 pr-5 m-4 box-border border-4 border-red-500 rounded-full"
              type="text"
              name="Phone_No"
              required
              onChange={(e) => {
                setPhone_No(e.target.value);
              }}
            />

            <br />

            <button
              type="submit"
              value="Send"
              className="w-[50%] box-border border-4 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
              onClick={TakeAppointment}
            >
              SUBMIT
            </button>
          {/* </form> */}
        </div>

        <div className="absolute inset-y-0 right-10 top-10 w-[25%] h-[85%] bottom-[10%] border-4 border-red-500 ">
          <Map />
        </div>

        <p className="absolute inset-y-0 right-[28rem] top-20 w-fit m-10 font-serif text-lg">
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
        </p>
      </div>

      <div>
        <p className="font-serif text-xs mt-10">
          © Copyright 2023 | Mayank Depression Research Centre. MDRC permits
          electronic copying and sharing of all portions of its public website
          and requests in return only the customary copyright acknowledgement,
          using “© Copyright Mayank Depression Research Centre” and the date of
          the download.
          <br />
          <br />
          MDRC Screening is an educational program intended to help inform
          people about options they have in getting help for mental health
          issues. It may suggest tools and resources that offer information,
          treatment services, do-it-yourself tools, and/or ways to connect with
          others. It does not represent its results as an exhaustive list of all
          services available to a given individual for a given mental health
          concern, as an endorsement of specific treatments or services, or as a
          replacement for treatment or services as performed by a qualified
          provider. For any and all suggestions, comments, or questions, please
          contact Mayank Depression Research Centre.
          <br />
          <br />
          Site Terms of Use and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default PopUp;
