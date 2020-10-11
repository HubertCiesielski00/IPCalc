const IpValidForm = /^[0-9]{1,3}[\.,][0-9]{1,3}[\.,][0-9]{1,3}[\.,][0-9]{1,3}$/

window.onload = () =>{
    let Submit = document.querySelector("#Submit");
    Submit.addEventListener("click",Calculate);
    addEventListener("keydown", (event) =>
    {
        if(event.key == "Enter"){
            Calculate();
        }
    })
}