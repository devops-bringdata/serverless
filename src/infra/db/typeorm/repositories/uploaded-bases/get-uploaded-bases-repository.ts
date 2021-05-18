import { IGetUploadedBasesRepository } from '@/data/protocols/db/uploaded-bases/get-uploaded-bases-repository'
import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { UploadedBase } from '../../entities/UploadedBase'
import { connect, disconnect } from '../../helpers/connection'

export class GetUploadedBasesRepository implements IGetUploadedBasesRepository {
  async get(schemaName: string, enrichment?: boolean): Promise<IUploadedBaseModel[]> {
    const uploadedBaseRepository = (await connect(schemaName)).manager.getRepository(UploadedBase)
    let whereClause: any = { where: {}, order: { createdAt: 'DESC' } }
    if (enrichment) whereClause.where.mustEnrich = true
    const result: IUploadedBaseModel[] = await uploadedBaseRepository.find(whereClause)
    await disconnect()
    return result
  }
}
