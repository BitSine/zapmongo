import { Model, Document, SchemaDefinition } from 'mongoose';
interface DatabaseSchema {
	name: string;
	data: SchemaDefinition;
	render?: string;
}

interface ParsedSchema {
	name: string;
	data: Model<Document>;
	render?: string;
}
export { DatabaseSchema, ParsedSchema };
