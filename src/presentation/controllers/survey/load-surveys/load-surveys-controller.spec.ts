import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'amy_answer'
    }],
    date: new Date()
  }, {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'amy_answer'
    }],
    date: new Date()
  }]
}

const makeLoad = (): LoadSurveys => {
  class LoadSurveystub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveystub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveystub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveystub = makeLoad()
  const sut = new LoadSurveysController(loadSurveystub)
  return {
    sut,
    loadSurveystub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveystub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveystub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith()
  })
})
