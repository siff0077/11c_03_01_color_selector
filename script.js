"use strict";

window.addEventListener("load", init);

function init() {
  document.querySelector("input").addEventListener("input", delegator);
}

function delegator() {
  //Defines input and hex("waits" for return value), then calls displayHEX
  const input = document.querySelector("input");
  const hex = getInput(input.value);
  displayHEX(hex);

  //Defines rgb("waits" for return value), then calls displayRGB
  const rgb = hexToRGB(hex);
  displayRGB(rgb);

  //Defines hsl("waits" for return value), then calls displayHSL
  const hsl = rgbToHSL(rgb);
  displayHSL(hsl);
}

function getInput() {
  //Defines input, and returns that value to 'delegator'
  const input = document.querySelector("input").value;
  return input;
}

function hexToRGB(hex) {
  //Defines RGB values and returns dem to 'delegator'
  let r = parseInt(hex.substring(1, 3), 16); 
  let g = parseInt(hex.substring(3, 5), 16); 
  let b = parseInt(hex.substring(5, 7), 16); 

  console.log(r, g, b);
  return { r, g, b };
}

function rgbToHSL(rgb) {
  //converts RGB to HSL and defines the HSL values, then returns them to 'delegator'
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }
  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

// amount of decimal is getting shortened to 2 and output is inserset to html
  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  

  return { h, s, l };
}


function displayHEX(hex) {
  //Makes the box the same color/value, as chosen by the user
  document.querySelector("#color").style.backgroundColor = `${hex}`;

  //Displays HEX by inseting it into the #hex with textContent
  const displayHEXCode = "HEX: " + hex;
  document.querySelector("#hex").textContent = displayHEXCode;
}


function displayRGB(rgb) {
  
   //Displays RGB by inseting it into the #hex with textContent
  const displayRBGCode = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
  document.querySelector("#rgb").textContent = displayRBGCode;
}


function displayHSL(hsl) {
  
   //Displays HSL by inseting it into the #hex with textContent
  const displayHSLCode = `HSL: ${hsl.h}, ${hsl.s}, ${hsl.s}`;
  document.querySelector("#hsl").textContent = displayHSLCode;
}

