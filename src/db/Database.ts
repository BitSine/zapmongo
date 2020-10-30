import mongoose from 'mongoose';
import { DatabaseOptions } from '../interfaces/DatabaseOptions';
import { DatabaseSchema, ParsedSchema } from '../interfaces/DatabaseSchema';

// database manager
class Database {
	public options: DatabaseOptions;
	public schemas: Map<string, ParsedSchema>;
	public constructor(options: DatabaseOptions) {
		// set config
		this.options = options;
		// get loadable schemas
		options.schemas.map((value: DatabaseSchema) => {
			this.schemas.set(value.name, {
				name: value.name,
				data: mongoose.model(value.name, new mongoose.Schema(value.data)),
			});
		});
	}
	public load(schema: string) {}
}
export { Database };
