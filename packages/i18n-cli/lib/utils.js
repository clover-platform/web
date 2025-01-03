import fs from 'fs';
import path from 'path';
import {exec} from "child_process";

export const exists = (path) => {
    let has;
    try{
        has = !!fs.statSync(path);
    }catch (e) {
        has = false;
    }
    return has;
};

export const getBranchName = () => {
    return new Promise((resolve, reject) => {
        exec('git symbolic-ref --short -q HEAD', function(error, stdout, stderr){
            if(error) {
                reject(error);
            }else{
                resolve(stdout.split('\n')[0]);
            }
        });
    });
}

const mkdir = (path) => {
    fs.mkdirSync(path);
};

//递归创建目录 同步方法
export function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function _copy(src, dist) {
    let paths = fs.readdirSync(src);
    paths.forEach(function(p) {
        let _src = src + '/' +p;
        let _dist = dist + '/' +p;
        let stat = fs.statSync(_src);
        if(stat.isFile()) {// 判断是文件还是目录
            fs.writeFileSync(_dist, fs.readFileSync(_src));
        } else if(stat.isDirectory()) {
            copyDir(_src, _dist); // 当是目录是，递归复制
        }
    });
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copy(src,dist){
    let b = fs.existsSync(dist);
    if(!b){
        mkdirsSync(dist);//创建目录
    }
    _copy(src,dist);
}

const randomString = function (len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

const rmdir = (path) => {
    if (!fs.existsSync(path)) {
        return;
    }
    let delSingleDir = function(path) {
        let files = fs.readdirSync(path);
        files.forEach(function(fi) {
            let curr = path + "/" + fi;
            if (fs.statSync(curr).isDirectory()) {
                delSingleDir(curr);
            } else {
                fs.unlinkSync(curr);
            }
        });
        fs.rmdirSync(path);
    };
    delSingleDir(path);
};

function mkdirs(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirs(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

export const writeJSON = (path, data) => {
    // console.log('write json: ', path);
    let json = JSON.stringify(data, '', '\t');
    // json = json.replace(/_u0022/g,'\\u0022').replace(/_u0027/g,'\\u0027');
    fs.writeFileSync(path, json);
};

const checkFileType = (fileName, types) => {
    for(const index in types) {
        const type = types[index];
        if(fileName.endsWith(type)){
            return true;
        }
    }
    return false;
};

export const readDirSync = (path, types = [], exclude = []) => {
    const dirTemp = [];
    const _readDirSync = (path) => {
        let pa = fs.readdirSync(path);
        for(let ele of pa) {
            let info = fs.statSync(path+"/"+ele);
            if(info.isDirectory()){
                if(exclude.includes(ele)) continue;
                _readDirSync(path+"/"+ele);
            }else{
                if(types && types.length) {
                    const checked = checkFileType(ele, types);
                    if(checked) {
                        dirTemp.push(path+"/"+ele);
                    }
                }else{
                    dirTemp.push(path+"/"+ele);
                }
            }
        }
    };
    _readDirSync(path);
    return dirTemp;
}
