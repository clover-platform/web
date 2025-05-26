import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export const exists = (path) => {
  let has
  try {
    has = !!fs.statSync(path)
  } catch (_e) {
    has = false
  }
  return has
}

export const getBranchName = () => {
  return new Promise((resolve, reject) => {
    exec('git symbolic-ref --short -q HEAD', (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout.split('\n')[0])
      }
    })
  })
}

//递归创建目录 同步方法
export function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname)
    return true
  }
}

export const writeJSON = (path, data) => {
  // console.log('write json: ', path);
  const json = JSON.stringify(data, '', '\t')
  // json = json.replace(/_u0022/g,'\\u0022').replace(/_u0027/g,'\\u0027');
  fs.writeFileSync(path, json)
}

const checkFileType = (fileName, types) => {
  for (const type of types) {
    if (fileName.endsWith(type)) {
      return true
    }
  }
  return false
}

function _readDirSync(path, types, exclude, dirTemp) {
  const pa = fs.readdirSync(path)
  for (const ele of pa) {
    const info = fs.statSync(`${path}/${ele}`)
    if (info.isDirectory()) {
      if (exclude.includes(ele)) continue
      _readDirSync(`${path}/${ele}`, types, exclude, dirTemp)
    } else if (types?.length) {
      const checked = checkFileType(ele, types)
      if (checked) {
        dirTemp.push(`${path}/${ele}`)
      }
    } else {
      dirTemp.push(`${path}/${ele}`)
    }
  }
}

export const readDirSync = (path, types = [], exclude = []) => {
  const dirTemp = []
  _readDirSync(path, types, exclude, dirTemp)
  return dirTemp
}
