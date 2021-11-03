// import { useHistory } from "react-router-dom";
import { useRef } from "react";
import ReactDOM from "react-dom";
import LinkToLogin from "./LinkToLogin";
import ReactDOMServer from "react-dom/server";

function useMapboxButtons(openVenueModal, isAuthenticated) {
  // const history = useHistory();
  // const redirectToLogin = () => {
  //   history.push("/login");
  // };

  if (isAuthenticated) {
    let newVenueBtn = document.createElement("div");
    newVenueBtn.innerHTML = `<button style="margin:3px">Create New Venue</button>`;

    newVenueBtn.addEventListener("click", (e) => {
      openVenueModal();
    });

    return newVenueBtn;
  } else {
    let loginBtn = document.createElement("div");
    loginBtn.innerHTML = `<button style="margin:3px">Login</button>`;

    loginBtn.addEventListener("click", (e) => {
      document.getElementById("redirectToLogin").click();
    });

    return loginBtn;
  }
}

export default useMapboxButtons;
