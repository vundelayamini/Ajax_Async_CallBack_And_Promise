/* UC3- Ability to view Employee Data from JSON Server having ID, Name and Salary using AJAX and Promise.
 */
         let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

         function showTime() {
             const date = new Date();
            return date.getHours() + "Hrs:"  + date.getMinutes() + "Mins:" +date.getSeconds()+ "Secs";
         }
         
         function makePromiseCall(methodType, url, async = true, data = null) {
             return new Promise(function (resolve, reject) {
                 let xhr = new XMLHttpRequest();
                 xhr.onreadystatechange = function(){ 
                     if (xhr.readyState === 4) {
                         if (xhr.status === 200 || xhr.status === 201){
                             resolve(xhr.responseText);
                         } else if (xhr.status >= 400) {
                             reject({
                                 status: xhr.status,
                                 statusText: xhr.statusText
                              });
                             console.log("Handle 400 Client Error or 500 Server Error at: "+showTime());
                         }
                     }
                 }
                 xhr.open(methodType, url, async);
                 if (data) {
                     xhr.setRequestHeader("Content-Type", "application/json");
                     xhr.send(JSON.stringify(data));
                 } else xhr.send();
                 console.log(methodType+" request sent to the server at: "+showTime());
             });
         }
         
         const getURL = "http://127.0.0.1:3000/employees";
         makePromiseCall("GET", getURL, true)
            .then(responseText => {
               console.log("Get User Data at: " + showTime() + " data: " +responseText);
            })
            .catch(error => console.log("GET Error Status: "+
                                        JSON.stringify(error)));
         console.log("Made GET AJAX Call to Server at "+showTime());
         
         const deleteURL = "http://localhost:3000/employees/3";
         makePromiseCall("DELETE", deleteURL, false)
            .then(responseText => {
               console.log("User Deleted: "+responseText)
            })
            .catch(error => console.log("DELETE Error Status: "+
                                        JSON.stringify(error)));
         
         const postURL = "http://localhost:3000/employees";
         const emplData = {"name": "Ekta","salary": "50000"};
         makePromiseCall("POST", postURL, true, emplData)
            .then(responseText => {
               console.log("User Added: "+responseText)
            })
            .catch(error => console.log("POST Error Status: "+
                                        JSON.stringify(error)));