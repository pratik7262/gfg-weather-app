import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState("");
  const [city, setCity] = useState("pune");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (city) => {
    const responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e16d5b6d47b1ad505b1a7e6dc8902687`
    );

    const json = await responce.json();

    setData(json);
    if (json.message) {
      setLoading(false);
      setError(true);
    }
    if (json.id) {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    fetchData(city);
    // eslint-disable-next-line
  }, []);

  return (
    <Stack
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Paper
        elevation={12}
        sx={{
          p: 2,
          width: { xs: "80vw", md: "30vw" },
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && <CircularProgress />}
        {error && <Typography variant="h5">{data.message} </Typography>}
        {!loading && !error && (
          <Stack spacing={1} width="100%" height="100%">
            <Stack
              direction="row"
              justifyContent="space-between"
              // border="1px solid red"
              height="10%"
            >
              <Typography variant="h6">{data.name}</Typography>
              <Typography variant="h6">
                {Math.round(data.main.temp - 273)} °C
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              height="80%"
              bgcolor="grey"
            >
              <img
                style={{ height: "auto", width: "40%" }}
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                alt="weather-status-img"
              />
            </Stack>
            <Stack height="10%" justifyContent="center" alignItems="center">
              <Typography variant="h5">{data.weather[0].main}</Typography>
            </Stack>
          </Stack>
        )}
      </Paper>
      <Paper
        elevation={12}
        sx={{
          width: { xs: "80vw", md: "30vw" },
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <TextField
            onChange={handleChange}
            label="City"
            value={city}
            variant="standard"
            fullWidth
          />
          <Button
            onClick={() => {
              setLoading(true);
              fetchData(city);
              setCity("");
              setError(false);
            }}
            sx={{ textTransform: "inherit" }}
            variant="contained"
          >
            See Weather
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Home;
