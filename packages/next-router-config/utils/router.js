import path, {resolve} from "path";
import fs from "fs";
import * as acorn from "acorn";
import jsx from "acorn-jsx";

const JSXParser = acorn.Parser.extend(jsx());

const _listFile = (list, dir, supports) => {
    const arr = fs.readdirSync(dir);
    arr.forEach(function(item){
        const fullPath = path.join(dir,item);
        const stats = fs.statSync(fullPath);
        if(stats.isDirectory()){
            _listFile(list, fullPath, supports);
        }else{
            if(supports.includes(item)) list.push(fullPath);
        }
    });
}

const listFile = (dir, supports) => {
    const list = [];
    _listFile(list, dir, supports);
    return list;
}

export const genConfig = (config) => {
    const root = resolve('./src/app');
    const { supports, dist, varName, fileName } = config;
    const files = listFile(root, supports.map((item) => `${fileName}.${item}`));
    const configResult = [];
    const importResult = [];

    let error = false;
    for(let file of files) {
        const data = fs.readFileSync(file).toString();
        let ast = null;
        try{
            ast = JSXParser.parse(data, {
                ecmaVersion: 'latest',
                sourceType: 'module'
            });
        }catch (e) {
            error = true;
        }
        if(!ast) break;
        ast.body.filter(({type}) => (type === 'ExportNamedDeclaration')).forEach((node) => {
            const {start,end} = node;
            let source = data.substring(start, end);
            if(!source.includes(varName)) return;
            if(source.endsWith(";")) source = source.substring(0, source.length - 1);
            let path = file.replace(root, "").replace(/\\/g, "/").replace("/[LANG]", "");
            supports.map((item) => `${fileName}.${item}`).forEach((item) => {
                path = path.replace(item, "");
            })
            const has = !!configResult.find(({path: p}) => (p === path));
            const reg = new RegExp(`export(\\s+)const(\\s+)${varName}(\\s+)=`);
            source = source.replace(reg, "");
            if(!has) {
                configResult.push({
                    path,
                    config: source
                });
                const imports = ast.body.filter(({type}) => (type === 'ImportDeclaration'));
                imports.forEach((node) => {
                    const { start, end } = node;
                    node.specifiers.forEach(({local}) => {
                        const { name } = local;
                        if(source.includes(name)) { // 有引用
                            const hasImport = !!importResult.find(({name: n}) => (n === name));
                            if(!hasImport) {
                                importResult.push({
                                    name,
                                    source: data.substring(start, end)
                                })
                            }
                        }
                    })
                })
            }
        });
    }

    if(error) return;

    const importCode = importResult.map(({source}) => source).join("\n");

    fs.writeFileSync(resolve(dist), `//文件自动生成，请勿编辑\n${importCode}\nexport default [${configResult.map((config) => {
        return `{ path: "${config.path}", config: ${config.config} }`;
    }).join(",")}]`);
}
