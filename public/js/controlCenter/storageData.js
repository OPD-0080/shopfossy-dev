
const saveData = (data) => {
    sessionStorage.setItem("RT", JSON.stringify(data));
}
const getData = async () => {
    const res = await JSON.parse(sessionStorage.getItem("RT"));
    return res
}

class Store {
    save_data_realTime(data) {
        const res = saveData(data);
        return res;
    }
    get_encrypted_data_realTime() {
        const res = getData();
        return res;
    }
}

export { Store };