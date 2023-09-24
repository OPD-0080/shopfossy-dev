const fs = require("fs").promises;
const path = require("path");


// IMPORTATION OF FILES

// ...
const fs_delete_file_from_storage = async (filepath, filename) => {
    const data = {
        file_destination: filepath,
        fileName: filename
    }
    const resp = fs.unlink(path.join(data.file_destination, data.fileName));
    return resp;
};
const fs_deleteFileFromDir = async (srcUrl) => {
    const resp = fs.unlink(srcUrl);
    return resp;
};
const fs_fileExist = async (storage_folder_path) => {
    const storage_path = storage_folder_path;
    const resp = await fs.access(storage_path);
    return resp
}
const fs_createFile = async (file_path) => {
    const path = file_path;
    const resp = await fs.mkdir(path)
    return resp;
}
const fs_writeData = async (file_path, data) => {
    const path = file_path;
    const resp = await fs.writeFile(path, JSON.stringify(data));

    return resp
}
const fs_writeData_with_flag_opt = async (file_path, data) => {
    const path = file_path;
    const resp = await fs.writeFile(path, JSON.stringify(data), { flag: "a" });

    return resp
}
const fs_copyData = async (dataPath, destination) => {
    const path = dataPath;
    const resp = await fs.copyFile(path, destination);

    return resp
}
const fs_copyFileDir = async (fromDir, toDir) => {
    const path = fromDir;
    const resp = await fs.cp(path, toDir, { recursive: true });

    return resp
}
const fs_readFile = async (srcDir) => {
    const path = srcDir;
    const resp = await fs.readFile(path);

    return resp
};
const fs_streamData_write = async (srcDir) => {
    const path = srcDir;
    const resp = await fs.re

    return resp
}
const fs_streamData_read = async (srcDir) => {
    const path = srcDir;
    const resp = await fs.createReadStream(path);

    return resp
}

const fs_readFileDir = async (srcDir) => {
    const path = srcDir;
    const resp = await fs.readdir(path);

    return resp
}
const fs_appendFile = async (srcDir, data) => {
    const path = srcDir;
    const resp = await fs.appendFile(path, data);

    return resp
}
const fs_renameFile = async (oldPathData, newPathData) => {
    const resp = await fs.rename(oldPathData, newPathData);

    return resp
}




class Fs_WriteDataTo {
    async realTime(cache) {
        const fs_res = await fs_writeData("./cc_tem_storage/realTime.json", cache); // for realTime
    }
}



module.exports = { fs_delete_file_from_storage, fs_fileExist, fs_createFile,
    fs_writeData, Fs_WriteDataTo, fs_copyData,  fs_copyFileDir, fs_readFile, fs_readFileDir,
    fs_appendFile, fs_deleteFileFromDir, fs_renameFile, fs_writeData_with_flag_opt,
    //fs_streamData_write, fs_streamData_read
}