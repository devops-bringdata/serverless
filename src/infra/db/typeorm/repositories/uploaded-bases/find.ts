import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IFindUploadedBase } from '@/domain/usecases/uploaded-bases/find-uploaded-base'
import { UploadedBase } from '../../entities'
import { Database } from '../../helpers/Database'

export class FindUploadedBaseRepository implements IFindUploadedBase {
  async find(schemaName: string, group: string): Promise<IUploadedBaseModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const uploadedBaseRepository = connection.manager.getRepository(UploadedBase)
    let whereClause: any = { where: { group } }
    const result: IUploadedBaseModel = await uploadedBaseRepository.findOne(whereClause)
    return result
  }
}
