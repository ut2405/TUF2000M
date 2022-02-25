import { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

function App() {
  const [parse, setParse] = useState(null);
  const [rawtext, setText] = useState(null);
  const [update, setupdate] = useState(null);
  const [tuf2000, settuf] = useState(null);
  function handleUpload(event) {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setText(text);
    };
    reader.readAsText(event.target.files[0]);    
  }
  const uploadData = async () => {
    const strs=rawtext.split(/\r?\n/);
    var response;    
    await Promise.all(strs.map(async (str) => {
      response= await axios.put(
        "http://localhost:8000/tuf/v1/update/"+str    
      );
      
    }));   
    setupdate(response.data); 
    window.location.reload(false);   
  };

  const parseData = async () => {
    const response = await axios.put(
      "http://localhost:8000/tuf/v1/parse"
    );
    setParse(response.data);
  };

  const fetchData = async () => {
    setText(null);
    const response = await axios.get(
      "http://localhost:8000/tuf/v1"
    );
    settuf(response.data);
  };

  const cleanData = async () => {
    const response = await axios.put(
      "http://localhost:8000/tuf/v1/clean"
    );
    settuf(response.data);
    window.location.reload(false);
  };

  return (
    <div className="App">
      <h1>TUF2000M Parse Data Information</h1>
      <h2>input *.txt file - press Upload(wait for refresh) - press Parse - press Fetch Data</h2>
      <h2>{rawtext}</h2>      
      {/* upload data */}
      <div>
        <input onChange={handleUpload} type="file" />

        <button className="upload-button" onClick={uploadData}>
          Upload
        </button>
        <br />
      </div>

      {/* parse data */}
      <div>
        <button className="parse-button" onClick={parseData}>
          Parse
        </button>
        <br />
      </div>

      {/* Fetch data from server */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* Clean raw data from server */}
      <div>
        <button className="clean-button" onClick={cleanData}>
          Clean Raw dt
        </button>
        <br />
      </div>

      {/* Display data */}
      <div className="tuf2000">
        {tuf2000 &&
          tuf2000.map((TUFinf, index) => {
            return (
              <div className="TUFinf" key={index}>
                {TUFinf.Number===2?(
                   <h3>Register: {TUFinf.Register} - {TUFinf.Register +1} </h3>
                ):TUFinf.Number===3?(
                  <h3>Register: {TUFinf.Register} - {TUFinf.Register +1} - {TUFinf.Register +3} </h3>
                ):(<h3>Register {TUFinf.Register} </h3>
                  )
                }                
                <h2>{TUFinf.VName}</h2>

                <div className="details">
                  <p>Value: {TUFinf.rbvalue}</p>
                  <p>Unit: {TUFinf.Unit}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;