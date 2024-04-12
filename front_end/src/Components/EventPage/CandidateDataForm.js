import React, { useState } from "react";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import Template from "../../Assets/studentData.xlsx";
import StudentGrid from "./StudentDataGrid";

export default function FormTwo({ setStudentData }) {
  const [studentsData, setStudentsData] = useState([]);

  const handleFileChange = (e) => {
    var files = e.target.files;
    var f = files[0];
    console.log(f);
    if (files) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        let readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        let dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
        dataParse.splice(0, 1);
        setStudentData(dataParse);
        setStudentsData(dataParse);
      };
      reader.readAsBinaryString(f);
    }
  };
  return (
    <>
      <input
        id="uploadStudentsData"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
      {studentsData.length <= 0 && (
        <>
          <Button
            variant="contained"
            onClick={() => {
              window.open(Template);
            }}
            style={{ margin: "1%" }}
          >
            Download Template
          </Button>
          <Button
            onClick={() => {
              document.getElementById("uploadStudentsData").click();
            }}
            variant="contained"
            style={{ margin: "1%" }}
          >
            Upload students data
          </Button>
        </>
      )}
      {/* {studentsData.length > 0 && (
        <>
          <Button variant="contained" style={{ margin: "1%" }}>
            Generate Certificate
          </Button>
          <Button variant="contained" style={{ margin: "1%" }}>
            Download Certificate(s)
          </Button>
        </>
      )} */}
      {studentsData.length > 0 && <StudentGrid data={studentsData} />}
    </>
  );
}
