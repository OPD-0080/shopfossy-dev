const encodeData = (data) => {
    const encoder = new TextEncoder();
    const res = encoder.encode(data);
    return res;
}
const decodeData = (data) => {
    const decoder = new TextDecoder()
    const res = decoder.decode(data, {stream: true});
    return res;
}

export { encodeData, decodeData };
