import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols";
import { ObjectId, ReturnDocument } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";

export class SurveyResultMongoRepository implements SaveSurveyResultRepository{
 
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveysResults')
    surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true
    })
    
    const res =  await surveyResultCollection.findOne(
      {
        surveyId: new ObjectId(data.surveyId),
        accountId: new ObjectId(data.accountId)
      }
    )
    return MongoHelper.map(res)
  }

  
}