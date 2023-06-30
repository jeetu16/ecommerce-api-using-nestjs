import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
  
@Injectable()
export class ParseFile implements PipeTransform {
    transform( files: Array<Express.Multer.File> ): Express.Multer.File | Express.Multer.File[] {

        let mimetype : string[] = ['image/jpeg', 'image/jpg', 'image/png']
    
        if (files === undefined || files === null) {
            throw new BadRequestException('Validation failed (file expected)');
        }

        if (Array.isArray(files) && files.length === 0) {
            throw new BadRequestException('Validation failed (files expected)');
        }

        for (let index = 0; index < files.length; index++) {
            if(!mimetype.includes(files[index].mimetype)) {
                throw new BadRequestException('Validation failed (file should be .png, .jpeg or jpg)');
            }
        }
        return files;
    }
}
  