import { DatabaseOptions } from './src/interfaces/DatabaseOptions';
import { ParsedSchema } from './src/interfaces/DatabaseSchema';
import { SortFunction } from './src/interfaces/SortFunction';

declare class DatabaseModule {
	public _schema: ParsedSchema;
	public constructor(schema: ParsedSchema);
	public create(data: object): Promise<Document>;
	public update(searchData: object, updateData: object): Promise<Document>;
	public findOne(searchData: object): Promise<Document>;
	public increment(search: object, key: string, value: number): Promise<Document>;
	public decrement(search: object, key: string, value: number): Promise<Document>;
	public leaderboard(sort: SortFunction): Promise<Array<Document>>;
	public find(data: object): Promise<Array<Document>>;
	public delete(data: object): Promise<boolean>;
	public render(data: object): Promise<string>;
}

declare class Database {
	public options: DatabaseOptions;
	public schemas: Map<string, ParsedSchema>;
	public constructor(options: DatabaseOptions);
	public load(schema: string): Promise<DatabaseModule>;
}
export { Database, DatabaseModule };
