import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";

const MyProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSelectedTitles = Array.from(searchParams.getAll("title"));
  const [selectedTitles, setSelectedTitles] = useState(
    initialSelectedTitles.length > 0
      ? initialSelectedTitles
      : JSON.parse(localStorage.getItem("selectedTitles")) || []
  );

  useEffect(() => {
    // Store selected titles in localStorage
    localStorage.setItem("selectedTitles", JSON.stringify(selectedTitles));
  }, [selectedTitles]);

  const handleDeleteTitle = (index) => {
    const newSelectedTitles = [...selectedTitles];
    newSelectedTitles.splice(index, 1);
    setSelectedTitles(newSelectedTitles);
  };

  const handleDeleteAll = () => {
    setSelectedTitles([]);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Selected Titles:
      </Typography>
      <Button variant="contained" color="primary" onClick={handleDeleteAll}>
        Delete All
      </Button>
      <ul>
        {selectedTitles.map((title, index) => (
          <li key={index}>
            <Typography variant="h6">{title}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteTitle(index)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProfile;
