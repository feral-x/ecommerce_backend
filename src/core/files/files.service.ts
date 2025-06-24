import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { join, extname } from 'path';
import {existsSync, mkdirSync, } from 'fs';
import {writeFile} from "fs/promises"
import * as process from "node:process";

@Injectable()
export class FilesService {
	constructor(private readonly prisma: PrismaService) {
	}
	
	async saveProductImages(files: Express.Multer.File[]) {
		const allowedMimeTypes = ['image/jpg','image/jpeg', 'image/png', 'image/gif'];
		const uploadDir = join(process.cwd(), 'uploads');
		
		if(!existsSync(uploadDir)) {
			mkdirSync(uploadDir);
		}
		
		for(const file of files) {
			if(!allowedMimeTypes.some(type => type===file.mimetype)) throw new BadRequestException('files not allowed');
			const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
			const ext = extname(file.originalname);
			const fileName = `${randomName}${ext}`;
			const fullPath = `${uploadDir}/${fileName}`;
			await writeFile(fullPath, file.buffer);
			console.log(fullPath);
		}
	}
}
