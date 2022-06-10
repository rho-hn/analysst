import React from "react";
import "./FileUpload.css";
import { Link } from "react-router-dom";
import FlatfileImporter from "flatfile-csv-importer";
// import { Button } from "react-bootstrap";
import { Button } from "@mui/material";
import db from "./firebase";
import { useState } from "react";

const licenseKey = "e291b3fd-3b17-4c34-afb2-dedecabe8bff";

function FileUpload() {
  const [out, setOut] = useState([]);
  const customerName = [];
  const customerPassword = [];
  const customerEmail = [];

  // const [customerPassword, setCustomerPassword] = useState([]);

  FlatfileImporter.setVersion(2);

  const flatfileConfig = {
    type: "Contracts",
    fields: [
      { key: "name", label: "Full Name" },
      { key: "email", label: "Email Address" },
      { key: "phone", label: "Phone Number" },
    ],
  };

  const importer = new FlatfileImporter(licenseKey, flatfileConfig);

  importer.setCustomer({
    userId: "12345",
  });

  const submit = (e) => {
    for (let f = 0; f < out.length; f++) {
      e.preventDefault();
      db.collection("db2").add({
        name: customerName[f],
        phone: customerPassword[f],
        email: customerEmail[f],
      });

      // setCustomerName("");
      // setCustomerPassword("");
    }
    console.log("hm");
    console.log(out[0], "hello");
  };

  const launchFlatfile = () => {
    importer.requestDataFromUser().then((results) => {
      importer.displaySuccess("done");
      setOut(results.data);
      // setTimeout(() => {
      //   importer.displaySuccess("Success message!");
      //   setOut(results.data);
      // }, 1500);
    });
  };

  for (let j = 0; j < out.length; j++) {
    customerName.push(out[j].name);
  }
  for (let j = 0; j < out.length; j++) {
    customerPassword.push(out[j].phone);
  }
  for (let j = 0; j < out.length; j++) {
    customerEmail.push(out[j].email);
  }

  return (
    <section className="hero">
      <div className="col40">
        <div className="heading">
          <h2>
            How do you want to <span>Import</span> your leads
          </h2>
        </div>
        <div className="text-para">
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus sed
            purus vitae turpis ornare pretium dui mauris at. Turpi
          </p>
        </div>
        <div className="icon-text">
          <i className="fa-star"></i>
        </div>
        <div class="hero-footer">
          <div class="nav-button">
            <a href="#">Previous</a>
          </div>
          <div className="text-para-footer">
            <p>Step 2 of 3</p>
          </div>
          <div class="nav-button">
            <Link to="/leads">Next</Link>
          </div>
        </div>
      </div>
      <div className="col60">
        <Button
          sx={{ mb: 5 }}
          variant="outlined"
          className="csvbutton"
          onClick={launchFlatfile}
        >
          {" "}
          Click here to import CSV
        </Button>
        <Button m={5} variant="contained" onClick={submit}>
          Submit
        </Button>
        Please press Submit to submit to db
        <div className="image">
          <img src="../public/assets/g10.png" alt="" srcset="" />
        </div>
      </div>
    </section>
  );
}

export default FileUpload;
