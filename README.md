# ⚡ zapmongo

A [mongoose](https://npm.im/mongoose) wrapper.

**Features**

- ⚡ Lightning fast!
- 😴 A bunch of helpful functions
- ⌨ Written in **TypeScript**

**How to use**

**Initiate DB**

```js
const { Database } = require('zapmongo');
// or
import { Database } from 'zapmongo';

const db = new Database({ mongoURI: 'my-super-secret-mongo-uri-here', schemas: [
    {
        name: 'hello',
        data: {
            name: String,
            location: String
        }
    }
] });
// this will create a db and will have a schema named hello with the data of name and location.
```

**Load a schema**

```js
const Schema = db.load('hello');
```

**Update/create data**

```js
await Schema.update({ name: "hello" }, { name: "world!" });
// this will look for data with name of hello, if it finds it, it replcae it to "world!" - if not it'll create a new document defaulting to the second argument
```

**Find data**

```js
await Schema.findOne({ name: 'world!' }); // would return the first instance it can find that has name as "world!"
await Schema.find({ name: 'world!' }); // returns all data that has name as "world!"
```

**Delete**

```js
await Schema.delete({ name: 'world!' }); // would delete the first piece of data it finds that has name as 'world!'
```

**API**

set,update(searchData: object, updateData: object): Promise[Document]

get,findOne(searchData: object): Promise[Document]

leaderboard(sort: SortFunction): Promise[Array[Document]]

delete,remove(searchData: object): Promise[boolean]

create(data: object): Promise[Document]

increment,decrement(search: object, key: string, value: number): Promise[Document]
