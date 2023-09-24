

const pushDataIntoCache = (cache, serverRes) => {
    try {
        let index = "";
        (cache.length == 0) ? index = 0 : index = cache.length;
        
        console.log("STATUS...... :", cache, serverRes, index);
        for (let i = index; i < serverRes.length; i++) {
            const data = serverRes[i];
            // update cache 

            console.log("updated data to be uploaded in cache..... : ", data);
            cache.push(data)
            // ...
        }
        return true
    } catch (err) {
        console.log("Error in pushDataToCache function:", err);
        return false
    }
}

export { pushDataIntoCache }