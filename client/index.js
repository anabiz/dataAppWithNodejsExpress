document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    console.log('loadeddd');
    //loadHTMLTable([]);
});
console.log("yesssssss");

let loadHTMLTable= (data)=>{
    const table= document.querySelector('table tbody');
    //let tableHtml = "";
    console.log(data);

    if(data.length==0){
        table.innerHTML="<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    }

}