import * as Collections from 'typescript-collections';
export class Statistics
    {
		id : string;
		totalDataStored : number;
		numberOfFiles : number;
		numberOfMessages : number ;
		numberOfUsers : number;

		extensions : Collections.Dictionary<string, number>;
		dataPlans : Collections.Dictionary<string, number>;
		uploadDates : Collections.Dictionary<string, number>;
	}