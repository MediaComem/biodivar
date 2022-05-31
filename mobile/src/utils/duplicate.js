export function deepClone(data){
    var type = typeof data;
    var obj;
    if(type === 'array'){
        obj = [];
    } else if(type === 'object'){
        obj = {};
    } else {
        //No more next level
        return data;
    }
    if(type === 'array'){
        for(var i = 0, len = data.length; i < len; i++){
            obj.push(deepClone(data[i]));
        }
    } else if(type === 'object'){
        for(var key in data){
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}