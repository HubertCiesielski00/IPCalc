const Calculate = () =>{

    let Inputs = {
        IP: document.querySelector("#IP"),
        Mask : document.querySelector("#Mask"),
    }

    let Ip = CutString(Inputs.IP.value);
    let Mask = CutString(Inputs.Mask.value);


}

const CutString = Str =>{
    try{
        if(!IpValidForm.test(Str)){
            throw "Wprowadzono niepoprawne dane";
        }
        const Arr = [];
        let oct = '';

        Str += ".";
        for(let i = 0; i < Str.length; i++){
            if(Str[i] != "." && Str[i]!= ","){
                oct += Str[i];
            }
            else{
                oct = parseInt(oct);
                if(oct > 255){
                    throw "Wartość oktetu nie może być większa niż 255";
                }
                Arr.push(oct);
                oct = '';
            }
        }
        return Arr;
    }
    catch (e){
        alert(e);
    }
}

