import { Model, Document, SchemaDefinition } from 'mongoose';
interface DatabaseSchema {
	name: string;
	data: SchemaDefinition;
}

interface ParsedSchema {
	name: string;
	data: Model<Document>;
}
export { DatabaseSchema, ParsedSchema };
