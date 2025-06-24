import {Controller, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { FilesService } from './files.service';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
	
	
	@Post("/product-images")
	@UseInterceptors(FilesInterceptor('files'))
	async uploadProductImages(@UploadedFiles() files: Express.Multer.File[]){
		await this.filesService.saveProductImages(files);
	}
}
