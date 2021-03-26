const IpValidForm = /^[0-9]{1,3}[\.,][0-9]{1,3}[\.,][0-9]{1,3}[\.,][0-9]{1,3}$/

const Calculate = () =>{
    try{
        
        let Inputs = {
            IP: document.querySelector("#IP"),
            Mask : document.querySelector("#Mask"),
            Network : document.querySelector("#NetWork"),
            Broadcast : document.querySelector("#BroadCast")
        }

        let Ip = CutString(Inputs.IP.value);
        let Mask = CutString(Inputs.Mask.value);
        let Network = [];
        let Broadcast = [];

        let IpBinary = "";
        let MaskBinary = "";
        let NetworkBinary = "";
        let BroadcastBinary = "";

        for(let i = 0 ; i < 4; i++){
            IpBinary += ConvertToBinary(Ip[i]);
            MaskBinary += ConvertToBinary(Mask[i]);
        }
        if(IsMaskValid(MaskBinary)){
            for(let i = 0; i < MaskBinary.length; i++){
                if (MaskBinary[i] == '1')
                {
                    NetworkBinary += IpBinary[i];
                    BroadcastBinary += IpBinary[i];
                }
                else if (MaskBinary[i] == "0"){
                    NetworkBinary += '0';
                    BroadcastBinary += '1';
                }
                else {
                    throw 'An unnexpected error occoured';
                }
            }
            
        }
        Network = CutAddress(NetworkBinary);
        Broadcast = CutAddress(BroadcastBinary);
        for(let i = 0; i < 4; i++){
            Network[i] = ConvertToDecimal(Network[i]);
            Broadcast[i] = ConvertToDecimal(Broadcast[i]);
        }
        Inputs.Network.value = `${Network[0]}.${Network[1]}.${Network[2]}.${Network[3]}`;
        Inputs.Broadcast.value = `${Broadcast[0]}.${Broadcast[1]}.${Broadcast[2]}.${Broadcast[3]}`;
    }
    catch (error){
        alert(error);
    }
}

const CutString = Str =>{
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

const ConvertToBinary = Val =>{
    let result = "";
   for(let i = 7; i >= 0; i--){
       if(Val >= Power(2,i)){
           result += "1";
           Val -= Power(2,i);
       }
       else{
           result += "0";
       }
    }
    return result;
}

const Power = (base, exponent) =>{
    let result = base;
    if(exponent == 0){
        return 1;
    }
    else{
        for(let i = 1; i <exponent; i++)
        {
            result *= base;
        }
        return result;
    }
}
const IsMaskValid = Arr =>{
    
    for(let i = 1; i < Arr.length; i++){
        if (Arr[i] == '1' && Arr[i-1] == '0')
        {
            throw "Nieprawidłowa maska podsieci";
        }
    }
    
    return true;
}
const CutAddress = (Address) =>{
    let temp = "";
    const AddressToRet = [];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 8; j++){
            temp += Address[8*i+j];
        }
        AddressToRet.push(temp);
        temp = "";
    }
    return AddressToRet;
}
const ConvertToDecimal = (Arg) =>{
    let temp = 0;
    for(let i = Arg.length; i >=0 ; i--){
        if(Arg[i] == "1"){
            temp += Power(2, --Arg.length-i);
        }
    }
    return temp;
}

