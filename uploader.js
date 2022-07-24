/*

  use like so: window["local/path/to/choosefiles.js"]();
  
  __upload(isMultiple,callback);
  
  isMultiple enables whether to check multiple files or just one.
  if set to false, 1 file will be passed into the callback function.
  if set to true, an array of file(s) will be passed into the callback function.
  
*/


window[new Error().stack.match(location.href.match(/(.*)\//g)+"(.*?):")[1]]=()=>{

  function when(condition,callback,loadingMessage,finishedMessage){
    (function(){
      if(condition()){
        finishedMessage&&console.warn(finishedMessage);
        callback();
      }else{
        loadingMessage&&console.log(loadingMessage);
        requestAnimationFrame(arguments.callee);
      }
    })();  
  }

  window.__upload=function(isMultiple,callback){
    // first arg specifies whether to choose multiple files or only 1
    // may need user interaction (such as click or keypress) to work
    var input=document.createElement("input");
    input.type="file";
    if(isMultiple){
      input.multiple=true
    }
    input.style.position="fixed";
    input.onclick=()=>{
      input.remove();
      when(()=>input.files.length>0,()=>{
        if(isMultiple){
          // return an array of files
          var filesArray=[];
          for(let i=0;i<input.files.length;i++){
            filesArray.push(input.files[i]);
          }
          callback(filesArray);
          input=null;
        }else{
          // handle 1 file
          callback(input.files[0]);
          input=null;
        }
      });
    };
    document.documentElement.appendChild(input);
    input.click();
  };
  
  
};
