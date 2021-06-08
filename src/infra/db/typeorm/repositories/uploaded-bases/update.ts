import { UploadedBaseModelSave, IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IUpdateUploadedBase } from '@/domain/usecases/uploaded-bases/update-uploaded-base'
import { UploadedBase } from '../../entities'
import { Database } from '../../helpers/Database'

export class UpdateUploadedBaseRepository implements IUpdateUploadedBase {
  async update(
    schemaName: string,
    uploadedBaseId: string,
    uploadedBase: UploadedBaseModelSave
  ): Promise<IUploadedBaseModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const uploadedBaseRepository = connection.manager.getRepository(UploadedBase)
    const result: IUploadedBaseModel = await uploadedBaseRepository
      .update(uploadedBaseId, uploadedBase)
      .then((response) => response.raw[0])
      .catch((error) => {
        console.log(error)
      })
    return result
  }
}
