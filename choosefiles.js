/*

  use like so: window["local/path/to/choosefiles.js"]();
  
  attaches two functions to the window:
  use __chooseFile for a single file
  __chooseFile((file)=>{
    //... handle the uploaded file
  });
  or __chooseFiles for multiple files
  __chooseFiles((files)=>{
    //... handle the uploaded files
  });
  
*/


window[new Error().stack.match(location.href.match(/(.*)\//g)+"(.*?):")[1]]=()=>{

  var when=function(condition,callback,loadingMessage,finishedMessage){
    (function(){
      if(condition()){
        finishedMessage&&console.warn(finishedMessage);
        callback();
      }else{
        loadingMessage&&console.log(loadingMessage);
        requestAnimationFrame(arguments.callee);
      }
    })();  
  };

  window.__chooseFile=function(callback){
    // may need user interaction (such as click or keypress) to work
    var input=document.createElement("input");
    input.type="file";
    input.style.position="fixed";
    input.onclick=()=>{
      input.remove();
      when(()=>input.files.length>0,()=>{
        callback(input.files[0]);
        input=null;
      });
    };
    document.documentElement.appendChild(input);
    input.click();
  };
  
  
  window.__chooseFiles=function(callback){
    // may need user interaction (such as click or keypress) to work
    var input=document.createElement("input");
    input.type="file";
    input.multiple="true";
    input.style.position="fixed";
    input.onclick=()=>{
      input.remove();
      when(()=>input.files.length>0,()=>{
        var filesArray=[];
        for(let i=0;i<input.files.length;i++){
          filesArray.push(input.files[i]);
        }
        callback(filesArray);
        input=null;
      });
    };
    document.documentElement.appendChild(input);
    input.click();
  };
  
};
