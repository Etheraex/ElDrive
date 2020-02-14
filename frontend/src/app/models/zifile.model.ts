import { EncryptionAlgorithms } from './encryptionalgorithms.enum';

export class ZIFile {
	id?: string;
	name: string;
	// Owner hash
	hash: string;
	filehash: string;
	data: string = "";
	lastModified: Date;
	encryption: EncryptionAlgorithms;
	encryptionKey: string;
	size: number;
	haveAccess: Array<string>;
}
