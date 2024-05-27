import React from 'react';
import './style.scss';




export const ErrorPage = () => {
  return (
    <>
      <div class='body loading error-page' >
        <h1 className='text-center'>500</h1>
        <h2 className='text-center'>
          Unexpected Error <b>:(</b>
        </h2>
        <div class='gears'>
          <div class='gear border-rounded one'>
            <div class='bar'></div>
            <div class='bar'></div>
            <div class='bar'></div>
          </div>
          <div class='gear border-rounded two'>
            <div class='bar'></div>
            <div class='bar'></div>
            <div class='bar'></div>
          </div>
          <div class='gear border-rounded three'>
            <div class='bar'></div>
            <div class='bar'></div>
            <div class='bar'></div>
          </div>
        </div>
      </div>
    </>
  );
};
