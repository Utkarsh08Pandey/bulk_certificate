import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Button, Typography } from "@mui/material";
import EventCreation from "./EventCreationPage";
import axios from "axios";

export default function Index() {
  const [isEventPage, setIsEventPage] = useState(true);
  const [data, setData] = useState([])

  const getData = async () => {
    let response = await axios.get("http://localhost:5000/event/readEvent");
    console.log(response.data);
    setData(response.data.data)
    return response.data.data;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {isEventPage ? (
        <>
          <div style={{ margin: "1%" }}>
            <Button
              color="neutral"
              // style={{ float: "right" }}
              onClick={function () {
                setIsEventPage(false);
              }}
              size="md"
              variant="solid"
            >
              <AddIcon />
              Add
            </Button>
          </div>

          <Grid data={data}/>
        </>
      ) : (
        <EventCreation
          goToEventListingPage={() => {
            setIsEventPage(true);
          }}
        />
      )}
    </div>
  );
}
