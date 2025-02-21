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
