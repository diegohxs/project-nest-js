import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowStatuses = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
    ];


    transform(value : any){
        console.log('value', value);

        value = value.toUpperCase();

        if(! this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`)
        }

        return value;

    }

    private isStatusValid (status : any) {
        const idx = this.allowStatuses.indexOf(status);

        return idx !== -1;
    }

}