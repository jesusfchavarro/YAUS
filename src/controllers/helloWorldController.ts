import {Get, Tags, Route, Controller } from 'tsoa';
import {HelloWorld} from '../models/helloWorld' ;

@Route('HelloWorld')
@Tags('HelloWorld')
export class HelloWorldController extends Controller {
    @Get('{name}')
    @Tags('Info', 'Get')
    public async getHelloWorld(name: String): Promise<HelloWorld> {
        let HW:HelloWorld = {msg:"Hello World",name:name} 
        return HW;
    }
}
