function upload(callback){
  var input       = document.createElement("input");
  input.type      = "file";
  input.multiple  = true;
  // https://stackoverflow.com/questions/47664777/javascript-file-input-onchange-not-working-ios-safari-only
  /* 
   - to work on mobile safari:
   - input must be part of the DOM
   - must use event listener, not onchange
  */
  input.addEventListener("change",(e)=>{
    setTimeout(()=>input.remove()); // removing it on the next event cycle just in case
    callback([...e.target.files]);
  });
  input.style.display = "none";
  document.documentElement.appendChild(input);
  input.click();
}
