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
const Schema = await db.load('hello');
```

**Update/create data**

```js
await Schema.update({ name: "hello" }, { location: "world!" });
// this will look for data with name of hello, if it finds it, it replcae it to "world!" - if not it'll create a new document defaulting to the second argument. Nerd terms for if the 2nd param contains the same key as the first param, the key in the 2nd param will be favoured / used.

```

**Find data**

```js
await Schema.findOne({ name: 'hello' }); // would return the first instance it can find that has name as "world!"
await Schema.find({ name: 'hello' }); // returns all data that has name as "world!"
```

**Delete**

```js
await Schema.delete({ name: 'hello' }); // would delete the first piece of data it finds that has name as 'world!'
```

**NEW! 2.0.0+**

**Render data**

When creating a schema, make sure to pass render as a string, this is optional.

Example:

```js
{
    name: 'hello',
    data: {
        name: String,
        location: String
    },
    render: 'Wow! {name} {location}';
}
```

```js

await Schema.render({ name: 'hello' }); // provided you havent deleted data and you have created something like above
// returns: Wow! hello world!

**API**

update(searchData: object, updateData: object): Promise[Document]

findOne(searchData: object): Promise[Document]

leaderboard(sort: SortFunction): Promise[Array[Document]]

delete(searchData: object): Promise[boolean]

create(data: object): Promise[Document]

increment,decrement(search: object, key: string, value: number): Promise[Document]
