import React, { useState } from "react"; 
import { EXCEL_FILE_BASE64 } from "./CustomerExcelsheet";
// import "./Modal1.css";
import FileSaver from "file-saver";

function CusomerModel(){
  const handleDownload=()=>{
    let dataBlob = EXCEL_FILE_BASE64;
    let sliceSize = 1024;
    let byteCharacters = atob(dataBlob);
    let bytesLength=byteCharacters.length;
    let sliceCount=Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(sliceCount);
    for(let sliceIndex = 0; sliceIndex< sliceCount; ++sliceIndex){
      let begin = sliceIndex * sliceSize;
      let end= Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for(var offset = begin , i = 0; offset< end; ++i, ++offset){
        bytes[i]= byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex]= new Uint8Array(bytes);
    }
    let blob = new Blob(byteArrays, {type:"application/vnd.ms-excel"});
    FileSaver.saveAs(new Blob([blob],{}), "my-excel.xlsx");
  }
  return(
    <div className="App">
      <header className="App-header">
        <button onClick={handleDownload}>Download Template</button>
      </header>
    </div>
  )
}
export default CusomerModel;

