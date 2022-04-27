const DatabaseError = function(list, message) {
    this.list = list;
    this.message = message;
}
const database = {
    tables: {},
createTable(list) {
    const regexp = /create table ([a-z]+) \((.+)\)/;
    const parsedList = list.match(regexp);
    let [, tableName, columns] = parsedList;
    this.tables[tableName] = {
        columns: {},
        data: []
} 
columns = columns.split(", ");
for (let column of columns) {
    column = column.trim().split(' ');
    const [name, type] = column;
    this.tables[tableName].columns[name] = type;
};
    },
    insert(list){

        const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;
        const parsedList = list.match(regexp);
        let [,tableName, columns, values] = parsedList;
        columns = columns.split(', ');
        values = values.split(', ');
        let row = {};
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const value = values[i];
            row [column] = value;
        }
        this.tables[tableName].data.push(row);
    },
    execute (list) {
        if (list.startsWith('create table')) {
            return this.createTable(list);

        }
        if(list.startsWith('insert')){
            return this.insert(list);

        }
        const message = `Syntax error: "${list}"`;
        throw new DatabaseError (list, message);
    }
};

try{
    database.execute('create table author (id number, name string, age number, city string, state string, country string)'),
    database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
    database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
    database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
    console.log(JSON.stringify(database, undefined, '  '));
}    catch (e) {
    (console.log(e.message));
}