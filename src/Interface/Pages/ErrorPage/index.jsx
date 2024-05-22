import React from "react";
import "./style.scss";




export const ErrorPage = () => {
  return (
    <>
      <div class="body loading error-page" >
        <h1>500</h1>
        <h2>
          Unexpected Error <b>:(</b>
        </h2>
        <div class="gears">
          <div class="gear one">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <div class="gear two">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <div class="gear three">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
      </div>
    </>
  );
};