import mongoose from 'mongoose';
import { DatabaseOptions } from './interfaces/DatabaseOptions';
import { DatabaseSchema, ParsedSchema } from './interfaces/DatabaseSchema';
import { DatabaseModule } from './DatabaseModule';

// database manager
class Database {
	public options: DatabaseOptions;
	public schemas: Map<string, ParsedSchema> = new Map();
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
		mongoose.connect(options.mongoURI);
	}
	public async load(schema: string): Promise<DatabaseModule> {
		return new DatabaseModule(this.schemas.get(schema));
	}
}
export { Database };
