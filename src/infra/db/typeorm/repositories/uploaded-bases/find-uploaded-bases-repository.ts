import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IFindUploadedBase } from '@/domain/usecases/uploaded-bases/find-uploaded-base'
import { UploadedBase } from '../../entities/UploadedBase'
import { connect, disconnect } from '../../helpers/connection'

export class FindUploadedBaseRepository implements IFindUploadedBase {
  async find(schemaName: string, group: string): Promise<IUploadedBaseModel> {
    const uploadedBaseRepository = (await connect(schemaName)).manager.getRepository(UploadedBase)
    let whereClause: any = { where: { group } }
    const result: IUploadedBaseModel = await uploadedBaseRepository.findOne(whereClause)
    await disconnect()
    return result
  }
}
