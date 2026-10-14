import fs from 'node:fs';

export function loadTransaction(path){
    let text;

    try{
        text= fs.readFileSync(path,'utf8');
    } catch (err){
        throw new Error(`Cant read file ${path}`);
    }


let data;
try{
    data=JSON.parse(text);
} catch(err){
    throw new Error (`${path} is not valid JSON`);
}

if(!Array.isArray(data)){
        throw new Error(`Expected a list of transaction`);
}

return data;
}