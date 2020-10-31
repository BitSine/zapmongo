import { ParsedSchema } from '../interfaces/DatabaseSchema';
import { Document } from 'mongoose';
import { Anything } from '../interfaces/Anything';
import { SortFunction } from '../interfaces/SortFunction';

// database module
class DatabaseModule {
	public _schema: ParsedSchema;
	public constructor(schema: ParsedSchema) {
		this._schema = schema;
	}
	public async create(data: object): Promise<Document> {
		return await new this._schema.data(data).save();
	}
	public async update(searchData: object, updateData: object): Promise<Document> {
		const model = await this._schema.data.findOne(searchData);
		if (model) {
			Object.entries(updateData).map((value: [string, any]) => {
				(model as Anything)[value[0]] = value[1];
			});
			return await model.save();
		} else if (!model) {
			return await this.create({ ...searchData, ...updateData });
		}
	}
	public async findOne(searchData: object): Promise<Document> {
		return await this._schema.data.findOne(searchData);
	}
	public async increment(search: object, key: string, value: number) {
		// increment a number by whatever
		const data = await this.findOne(search);
		if (!data) {
			const newData: object = { ...search };
			newData[key] = value;
			return await this.create(newData);
		} else {
			(data as Anything)[key] += value;
			await data.save();
			return data;
		}
	}
	public async decrement(search: object, key: string, value: number) {
		// decrement a number by whatever
		const data = await this.findOne(search);
		if (!data) {
			const newData: object = { ...search };
			newData[key] = -value;
			return await this.create(newData);
		} else {
			(data as Anything)[key] -= value;
			await data.save();
			return data;
		}
	}
	public async leaderboard(sort: SortFunction) {
		// create a leaderboard
		const Data: Array<Document> = [...(await this.find({}))].sort(sort);
		const HandeledData: Array<Document> = Data.length > 9 ? Data.slice(0, 10) : Data;
		return HandeledData;
	}
	public async find(data: object) {
		const Data = await this._schema.data.find(data);
		return Data;
	}
	public async delete(data: object): Promise<boolean> {
		const Data = await this.findOne(data); // get data
		if (!Data) return false;
		// if no data, return false
		else await Data.deleteOne(); // if exists delete
		return true; // return true because the data exists & was deleted
	}
	public async remove(data: object): Promise<boolean> {
		return await this.delete(data);
	}
	public async set(data: object): Promise<Document> {
		return await this.update(data, data);
	}
	public async get(data: object): Promise<Document> {
		return await this.findOne(data);
	}
}

export { DatabaseModule };
