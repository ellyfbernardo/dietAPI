import { FastifyRequest, FastifyReply } from "fastify";

import { CreateNutritionService } from '../services/createNutritionServices';

export interface DataProps{
     name: string,
     weight: number,
     height: number,
     age: number,
     gender: string,
     objective: string,
     level: string,
}

class CreateNutritionController{
     async handle( request: FastifyRequest, reply: FastifyReply){
          const {name, weight, height, age, gender, objective, level} = request.body as DataProps;

          const createNutrition = new CreateNutritionService();

          const nutrition = await createNutrition.execute({
               name, 
               age, 
               gender, 
               height, 
               weight, 
               level, 
               objective});

          reply.send(nutrition);
     }
}

export { CreateNutritionController };