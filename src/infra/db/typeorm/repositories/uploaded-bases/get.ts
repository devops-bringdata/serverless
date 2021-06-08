import { IGetUploadedBasesRepository } from '@/data/protocols'
import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { UploadedBase } from '../../entities'
import { Database } from '../../helpers/Database'

export class GetUploadedBasesRepository implements IGetUploadedBasesRepository {
  async get(schemaName: string, enrichment?: boolean): Promise<IUploadedBaseModel[]> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const uploadedBaseRepository = connection.manager.getRepository(UploadedBase)
    let whereClause: any = { where: {}, order: { createdAt: 'DESC' } }
    if (enrichment) whereClause.where.mustEnrich = true
    const result: IUploadedBaseModel[] = await uploadedBaseRepository.find(whereClause)
    return result
  }
}
