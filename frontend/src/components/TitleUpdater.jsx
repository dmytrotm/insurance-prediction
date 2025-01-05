import { useLocation, useParams } from "react-router-dom";
import React, { useEffect } from "react";

function TitleUpdater() {
  const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
          case "/":
            document.title = "Home";
            break;
          case "/choose-country":
            document.title = "Choose Your Country";
            break;
          case "/india/question":
            document.title = "Tell us more about yourself";
            break;
          case "/america/question":
            document.title = "Tell us more about yourself";
            break;
          case "/result":
            document.title = "Result";
            break;
          default:
            document.title = "Not Found :(";
        }
    }, [location]);

  return null;
}

export default TitleUpdater;
