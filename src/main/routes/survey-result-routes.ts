import { Router } from 'express'
import { adaptRoute } from '../adapter/express/express-route-adapter'
import { makeLoadSurveyResultController } from '../factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
