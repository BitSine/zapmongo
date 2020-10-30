import { DatabaseSchema } from './DatabaseSchema';
interface DatabaseOptions {
	mongoURI: string;
	schemas: Array<DatabaseSchema>;
}
export { DatabaseOptions };
