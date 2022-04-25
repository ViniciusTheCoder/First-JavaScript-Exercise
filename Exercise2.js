const DatabaseError = function(list, message) {
    this.list = list;
    this.message = message;
}
const database = {
    tables: {},
    createTable(list) {
const regExp = /create table ([a-z]+) \((.+)\)/;
let parsedList = list.match(regExp);
let tableName = parsedList[1];
this.tables[tableName] = {
    columns: {},
    data: []
}
let columns = parsedList[2];  
columns = columns.split(", ");
for (let column of columns) {
    column = column.trim().split(' ');
    const name = column[0];
    const type = column[1];
    this.tables[tableName].columns[name] = type;
};
    },
    execute (list) {
        if (list.startsWith('create table')) {
            return this.createTable(list);

        }
        const message = `Syntax error: "${list}"`;
        throw new DatabaseError (list, message);
    }
};

try{
    database.execute('create table author (id number, name string, age number, city string, state string, country string)');
    database.execute("select id name from author");
    console.log(JSON.stringify(database, undefined, '  '));
}    catch (e) {
    (console.log(e.message));
}

