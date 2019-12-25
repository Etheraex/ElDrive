import { EncryptionAlgorithms } from './encryptionalgorithms.enum';

export class ZIFile {
	id?: string;
	name: string;
	hash: string;
	filehash: string;
	data: string = "";
	lastModified: Date;
	encryption: EncryptionAlgorithms;
	encryptionKey: string;
	size: number;
}
