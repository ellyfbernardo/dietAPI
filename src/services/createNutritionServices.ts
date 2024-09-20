import { DataProps } from '../controllers/createNutritionController';
import { GoogleGenerativeAI } from '@google/generative-ai'

class CreateNutritionService{
     async execute({name, age, gender, height, weight, level, objective}: DataProps){

          try{
               const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
               const model = genAI.getGenerativeModel({ model:"gemini-1.5-flash" })

               const response = await model.generateContent(`Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level}, inclua em cada refeição a quantidade de calorias que ela possui e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propridade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`)
               
               console.log(JSON.stringify(response, null, 2));

               if(response.response && response.response.candidates){
                    const jsonText = response.response.candidates[0]?.content.parts[0].text as string;

                    let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
                    let jsonObject = JSON.parse(jsonString);
        
                    return { data: jsonObject}
               }



          }catch(err){
               console.error("erro JSON", err);
               throw new Error("Failed Create")
          }
     }
}

export { CreateNutritionService }
