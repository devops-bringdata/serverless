import { IUploadedBaseModel, UploadedBaseModelSave } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IUpdateUploadedBase } from '@/domain/usecases/uploaded-bases/update-uploaded-base'
import { UploadedBase } from '../../entities'
import { connect } from '../../helpers/connection'

export class UpdateUploadedBaseRepository implements IUpdateUploadedBase {
  async update(
    schemaName: string,
    uploadedBaseId: string,
    uploadedBase: UploadedBaseModelSave
  ): Promise<IUploadedBaseModel> {
    const uploadedBaseRepository = (await connect(schemaName)).manager.getRepository(UploadedBase)
    const result: IUploadedBaseModel = await uploadedBaseRepository
      .update(uploadedBaseId, uploadedBase)
      .then((response) => response.raw[0])
      .catch((error) => {
        console.log(error)
      })
    return result
  }
}
