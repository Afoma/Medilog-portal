// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// Define the string

// Encode the String


var TokenUrl = "http://137.117.199.40:8096/access/vi/login"; // Your application token endpoint  


function getToken() {
let emailValue = document.getElementById("inputEmail").value;
let passwordValue = document.getElementById("inputPassword").value;
let numberValue = document.getElementById("inputNumber").value;
let payLoad={
email: emailValue,
password: passwordValue,
phoneNumber: numberValue,
requestId: "",
roleClaimId: [
  0
]
}

//console.log(payLoad);
var request = new XMLHttpRequest(); 
  request.open("POST", TokenUrl, true); 
  request.setRequestHeader("Content-type", "application/json");
  request.send(payLoad); // specify the credentials to receive the token on request
  request.onload = function () {
    console.log(responseText)
      if (request.readyState == request.DONE) {
        console.log('i don cook beans oooo');
          var response = request.responseText;
          var obj = JSON.parse(response); 
          key = obj.access_token; //store the value of the accesstoken
          token_ = key; // store token in your global variable "token_" or you could simply return the value of the access token from the function
      } else;
  }
}

























    // Getting my form elements
    const api="http://137.117.199.40:8096/access/v1/login"; // this is my login endpoint  

    let emailValue = document.getElementById("inputEmail");
    let passwordValue = document.getElementById("inputPassword");
    let numberValue = document.getElementById("inputNumber");
    let submitButton = document.getElementById("submitButton");


    
    submitButton.addEventListener("click",($event) => {
      $event.preventDefault();
      const post = {
        email : inputEmail.value, 
        password : Base64.encode(inputPassword.value),
        phoneNumber : inputNumber.value,
        requestId:"",
        roleClaimId:[0]
      };
      console.log(post);
      submitFormData(post);
    }) 




    function makeRequest(data){
      return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST",api);
        request.setRequestHeader("Content-Type","application/json");
        request.addEventListener("click", function(){
          let responseObject = JSON.parse(this.response);
          console.log(responseObject);
          if (responseObject.token) {
            console.log(responseObject.token);
          }else{
            console.log("No token received");
          }
        })
        request.send(JSON.stringify(data)); 
        request.onreadystatechange = () => {
          if(request.readyState === 4) {
            if(request.status === 201 || request.status === 200) {
              console.log(request.response)
              resolve(request.response);
            }else {
              reject(request.response);
              console.log(request.response)
            }
          }
        };  
      });
      localStorage.setItem(token);  
    }

    async function submitFormData(post){
      try{
        const requestPromise = makeRequest(post);
        const response = await requestPromise;
      }catch(errorResponse){
        console.log(errorResponse.error);
      }

    }



    