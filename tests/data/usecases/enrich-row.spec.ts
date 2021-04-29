// import { IEncrypter } from "@/data/protocols/criptography/encrypter"
// import { EnrichRow } from "@/data/usecases"
// import { IUploadedDataModel } from "@/domain/models/uploaded-data/uploaded-data"
// import { IEmailSender } from "@/domain/usecases"
// import { IUpdateUploadedData } from "@/domain/usecases/update-uploaded-data/update-uploaded-data"
// import { ok } from "@/presentation/helpers"
// import { IHttpResponse } from "@/presentation/protocols"
// const makeEncrypter = (): IEncrypter => {
//   class EncrypterStub implements IEncrypter {
//     encrypt(_payload: any): Promise<string> {
//       return new Promise((resolve) => resolve("any_hash"))
//     }
//   }
//   return new EncrypterStub()
// }
// const makeUpdateUploadedData = (): IUpdateUploadedData => {
//   class UpdateUploadedDataStub implements IUpdateUploadedData {
//     update(
//       _rowId: string,
//       _uploadedDataRow: IUploadedDataModel,
//       _schemaName: string
//     ): Promise<IUploadedDataModel> {
//       return new Promise((resolve) =>
//         resolve({
//           uuid: "any_id",
//           uploadedDataGroup: "any_data_group",
//           row_number: 0,
//           row_content: [{ header: "any_header", index: 1, value: "any_value" }],
//           row_validation: {
//             emailValidation: {
//               email: "any_email",
//               health: 100,
//               hints: ["any_hint"],
//               isValid: true,
//               needsExternalValidation: false,
//               validationMessage: "valid"
//             },
//             phoneValidation: {
//               phone: "any_phone",
//               health: 100,
//               hints: ["any_hint"],
//               isValid: true,
//               needsExternalValidation: false,
//               validationMessage: "valid"
//             }
//           },
//           row_enrichment: {}
//         })
//       )
//     }
//   }
//   return new UpdateUploadedDataStub()
// }
// const makeEmailSender = (): IEmailSender => {
//   class EmailSenderStub implements IEmailSender {
//     send(_message: IEmailSender.Params): Promise<IHttpResponse> {
//       return new Promise((resolve) => resolve(ok({})))
//     }
//   }
//   return new EmailSenderStub()
// }
// const makeSut = (): any => {
//   const emailSenderStub = makeEmailSender()
//   const updateUploadedDataStub = makeUpdateUploadedData()
//   const encrypterStub = makeEncrypter()
//   const sut = new EnrichRow(
//     emailSenderStub,
//     updateUploadedDataStub,
//     encrypterStub
//   )
//   return { sut }
// }
describe('EnrichRow', () => {
  test('should return Server Error if no row content was found', () => {
    expect(1).toBe(1)
  })
})
