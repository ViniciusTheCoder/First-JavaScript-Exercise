let list = 'create table author (id number, name string, age number, city string, state string, country string)';
let regExp = /create table ([a-z]+) \((.+)\)/;
let parsedList = list.match(regExp);
let tableName = parsedList[1];
let columns = parsedList[2];  
columns = columns.split(", ");
console.log(tableName);
console.log(columns);


