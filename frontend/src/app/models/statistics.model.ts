import * as Collections from 'typescript-collections';
export class Statistics
    {
		Id : string;
		TotalDataStored : number;
		NumberOfFiles : number;
		NumberOfMessages : number ;
		NumberOfUsers : number;

		Extensions : Collections.Dictionary<string, number>;
		DataPlans : Collections.Dictionary<string, number>;
		UploadDates : Collections.Dictionary<string, number>;
	}