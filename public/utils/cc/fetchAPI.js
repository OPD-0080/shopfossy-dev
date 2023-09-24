

const fetch_realTime_data = async () => {
    const res = await fetch("../../cc_tem_storage/realTime.json");
    const data = res.json();
    return data
}
const fetch_cc_entryOptions = async ()=> {
    const resp = await fetch("../../json/cc_entryOptions.json");
    const data = await resp.json();  
    return data
}
const fetch_cc_entryOptions_deafaults = async ()=> {
    const resp = await fetch("../../json/cc_entryOptionsDefaults.json");
    const data = await resp.json();  
    return data
}

export {
        fetch_realTime_data, fetch_cc_entryOptions, fetch_cc_entryOptions_deafaults 
    }