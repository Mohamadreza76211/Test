import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarFavorite from "./StarFavorite";
import logo from "../../src/Utility/Images/Digikala.png";
import { Button, Typography, Grid } from "@material-ui/core"; // Import Grid from Material-UI
import "./HomePage.scss";

const HomePage = () => {
  const [titles, setTitles] = useState([]);
  const [starColors, setStarColors] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedTitles, setSelectedTitles] = useState([]);

  useEffect(() => {
    // Fetching titles from the API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const titles = data.map((product) => product.title);
        setTitles(titles);
        setStarColors(Array(titles.length).fill(false));
      })
      .catch((error) => console.error("Error fetching titles:", error));

    // Checking if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedIn === "true");

    // Getting the username from localStorage
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername.toUpperCase());

    // Retrieve selected titles from localStorage
    const storedSelectedTitles =
      JSON.parse(localStorage.getItem("selectedTitles")) || [];
    setSelectedTitles(storedSelectedTitles);
  }, []);

  const handleStarClick = (index) => {
    const newStarColors = [...starColors];
    newStarColors[index] = !newStarColors[index];
    setStarColors(newStarColors);

    const selectedTitle = titles[index];
    if (newStarColors[index]) {
      // Add selected title to the list
      setSelectedTitles((prevTitles) => [...prevTitles, selectedTitle]);
    } else {
      // Remove unselected title from the list
      setSelectedTitles((prevTitles) =>
        prevTitles.filter((title) => title !== selectedTitle)
      );
    }

    // Store selected titles in localStorage
    localStorage.setItem("selectedTitles", JSON.stringify(selectedTitles));
  };

  const handleMyProfile = () => {
    // Send selected titles as query parameters to MyProfile
    const selectedTitlesQueryParam = selectedTitles
      .map((title) => `title=${encodeURIComponent(title)}`)
      .join("&");
    window.location.href = `/MyProfile?${selectedTitlesQueryParam}`;

    // Remove selected titles from titles
    const filteredTitles = titles.filter(
      (title) => !selectedTitles.includes(title)
    );
    setTitles(filteredTitles);
  };

  const handleSignOutClick = () => {
    // Clearing local storage and redirecting to SignInForm
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("selectedTitles");
    window.location.href = "/SignInForm";
  };

  return (
    <div>
      <div className="top">
        <div className="under-top">
          <p className="p-text">جایی برای بهترین ها</p>
        </div>
      </div>
      <div>
        <div className="headerBox">
          <img className="logo" src={logo} alt="logo" />
          <div className="title">
            <div className="collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    خانه
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    دسته بندی کالا
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    درباره ما
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {!isLoggedIn && (
            <div className="SignInAndSignupSection">
              <ul className="SignSection">
                <li>
                  <Link to="/SignInForm" className="SignInAndSignUpItem">
                    ورود
                  </Link>
                </li>
                <li>
                  <Link to="/SignUpForm" className="SignInAndSignUpItem">
                    ثبت نام
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {isLoggedIn && (
            <div className="LoggedInUserSection">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "blue",
                }}
              >
                {username}
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSignOutClick}
                  >
                    Signout
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMyProfile}
                  >
                    My Profile
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
      <div className="topBorder"></div>
      <div className="title">
        <div className="collapse">
          <Typography variant="h4" gutterBottom>
            Stores list:
          </Typography>
          <ul className="navbar-nav mr-auto">
            {titles.map(
              (title, index) =>
                !selectedTitles.includes(title) && (
                  <li
                    key={index}
                    className="LiForTitles"
                    style={{ listStyle: "none" }}
                  >
                    <Link to="/" className="nav-linkForTitles">
                      {title}
                    </Link>
                    <StarFavorite
                      filled={starColors[index]}
                      onClick={() => handleStarClick(index)}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
