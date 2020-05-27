import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/entities/user.entity';
import { GetUser } from 'src/auth/jwt/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
private logger = new Logger('TasksController');

    constructor(private tasksService: TasksService){}

    @Get(':id')
    getTaskById(@Param('id',ParseIntPipe) id :number, @GetUser() user : User): Promise<Task>{
        
        return this.tasksService.getTaskById(id,user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body()createTaskDto: CreateTaskDto,@GetUser()user : User,):Promise<Task>{
        this.logger.verbose(`User "${user.username}" creating a new task .Data: ${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto,user);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id : number,@GetUser() user: User): Promise<void>{
        return this.tasksService.deleteTask(id,user);
    }
    
    @Patch(':id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe)id:number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,@GetUser() user : User): Promise<Task>{
        return this.tasksService.updateTaskStatus(id,status,user);
    }

    @Get()
    getTasks(@Query(ValidationPipe)filterDto: GetTasksFilterDto,@GetUser() user: User) : Promise<Task[]>{
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters ${JSON.stringify(filterDto) }`); 
        return this.tasksService.getTasks(filterDto,user);
    }

      /*@Get()
    getTasks(@Query(ValidationPipe)filterDto: GetTasksFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else{
        return this.tasksService.getAllTasks();
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body()createTaskDto: CreateTaskDto):Task{
        return this.tasksService.createTasks(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id : string){
        this.tasksService.deleteTaskById(id);
    }

    @Patch(':id/status')
    updateTaskStatus(@Param('id')id:string,@Body('status', TaskStatusValidationPipe) status: TaskStatus): Task{
        return this.tasksService.updateTaskStatus(id,status)
    }
*/
}
