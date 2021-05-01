//
// Copyright (c) 2020-2021 w-gao
//

import {StrictMode} from "react";
import ReactDOM from "react-dom";
import HomeView from "./views/home.view";
import "./scss/index.scss";

ReactDOM.render(
  <StrictMode>
      <HomeView />
  </StrictMode>,
  document.getElementById("root")
);
