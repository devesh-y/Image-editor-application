const fileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#canvas");
const drawingcontext = canvas.getContext("2d");
const brightnessInput = document.querySelector("#brightness");
const saturationInput = document.querySelector("#saturation");
const blurInput = document.querySelector("#blur");
const inversionInput = document.querySelector("#inversion");

const settings = {

};
let image = null;

function resetSettings() 
{
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";

  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
}

function updatesettings(key, value) 
{
  if (!image) 
    return;

  settings[key] = value;
  processimage();
}

function myfilter() 
{
  const { brightness, saturation, blur, inversion } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function processimage() {
  canvas.width = image.width;
  canvas.height = image.height;

  drawingcontext.filter = myfilter();
  drawingcontext.drawImage(image, 0, 0);//from left 0 and right 0
}

brightnessInput.addEventListener("change", () =>
  updatesettings("brightness", brightnessInput.value)
);
saturationInput.addEventListener("change", () =>
  updatesettings("saturation", saturationInput.value)
);
blurInput.addEventListener("change", () =>
  updatesettings("blur", blurInput.value)
);
inversionInput.addEventListener("change", () =>
  updatesettings("inversion", inversionInput.value)
);

fileInput.addEventListener("change", () => 
{
  image = new Image();

  image.addEventListener("load", () => {
    resetSettings();
    processimage();
  });
  image.src = URL.createObjectURL(fileInput.files[0]);
});
document.getElementById("resetbtn").onclick=()=>{
  resetSettings();
  processimage();
}
resetSettings();
