import { IValidateEmail } from '@/data/protocols/validation/email'
import * as dns from 'dns'
import * as net from 'net'
export class ValidateEmail implements IValidateEmail {
  async validate(
    email: string,
    _validateExternally: boolean,
    timeout: number
  ): Promise<IValidateEmail.EmailValidationResponse> {
    function checkFormat(email: string) {
      const EMAIL_REGEX =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (typeof email === 'string' && email.length > 5 && email.length < 61 && EMAIL_REGEX.test(email)) {
        return true
      } else {
        return false
      }
    }
    async function getMxList(domain: string) {
      return await new Promise((resolve, reject) => {
        dns.resolveMx(domain, (error, addresses) => {
          if (error) reject(false)
          else resolve(addresses)
        })
      })
        .then((addresses: any) => {
          if (addresses.length === 1) {
            return addresses[0].exchange
          } else {
            // Find the lowest priority mail server
            const sorted = addresses.sort((a, b) => (a.priority > b.priority ? 1 : -1))

            return sorted[0].exchange > 0 ? sorted[0].exchange : sorted[1].exchange
          }
        })
        .catch(() => {
          return false
        })
    }
    return new Promise<IValidateEmail.EmailValidationResponse>(async function (resolve) {
      const parsedTimeout = timeout ? (timeout / 2) * 1000 : 30000
      setTimeout(async () => {
        // record.set('email_needs_external_validation', true);
        resolve({
          email: email,
          validationMessage: null,
          health: null,
          isValid: null,
          needsExternalValidation: true,
          hints: []
        })
      }, parsedTimeout)
      //Regex Analysis
      if (!checkFormat(email)) {
        resolve({
          email: email,
          validationMessage: 'invalid',
          health: 0,
          isValid: false,
          needsExternalValidation: false,
          hints: []
        })
      } else {
        // MX Analysis
        const domain = email.split('@')[1]
        const address = await getMxList(domain)

        // console.log(address);
        if (!address) {
          resolve({
            email: email,
            validationMessage: 'invalid',
            health: 0,
            isValid: false,
            needsExternalValidation: false,
            hints: []
          })
        } else {
          let step = 0
          const COMM = [
            'helo ' + domain + '\r\n',
            'ehlo ' + domain + '\r\n',
            'mail from:<sender@sender.com>\r\n',
            `rcpt to:<${email}>\r\n`,
            `rcpt to:<${
              Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }@${domain}>\r\n`,
            'rset\r\n',
            'quit\r\n'
          ]
          const socket = net.createConnection(25, address)
          let parsedTimeout = timeout ? Math.floor(timeout / 2) * 1000 : 30000
          socket.setTimeout(parsedTimeout)
          socket.on('data', async function (data) {
            if ((data.toString()[0] !== '2' && step !== 5) || (data.toString()[0] === '2' && step === 5)) {
              // record.set('email_needs_external_validation', true);
              socket.end()
              socket.destroy()
              return resolve({
                email: email,
                validationMessage: null,
                health: null,
                isValid: null,
                needsExternalValidation: true,
                hints: []
              })
            } else if (step < 7) {
              socket.write(COMM[step], function (err) {
                if (err) console.log('erro no write', err)
                step++
              })
            } else {
              socket.end()
              socket.destroy()
              return resolve({
                email: email,
                validationMessage: 'valid',
                health: 100,
                isValid: true,
                needsExternalValidation: false,
                hints: []
              })
            }
          })
          socket.on('error', async function (err: any) {
            console.log('entrou error', err)
            // record.set('email_needs_external_validation', true);
            socket.end()
            socket.destroy()
            resolve({
              email: email,
              validationMessage: null,
              health: null,
              isValid: null,
              needsExternalValidation: true,
              hints: []
            })
          })
          socket.on('timeout', async (err) => {
            console.log('entrou timeout', err)
            // record.set('email_needs_external_validation', true);
            // await record.save();
            socket.end()
            socket.destroy()
            resolve({
              email: email,
              validationMessage: null,
              health: null,
              isValid: null,
              needsExternalValidation: true,
              hints: []
            })
          })
          socket.on('lookup', async (err) => {
            if (err) {
              console.log('entrou lookup')
              console.log(err)
              // record.set('email_needs_external_validation', true);
              socket.end()
              socket.destroy()
              resolve({
                email: email,
                validationMessage: null,
                health: null,
                isValid: null,
                needsExternalValidation: true,
                hints: []
              })
            }
          })
          socket.on('drain', () => {
            console.log('ENTROU DRAIN')
          })
          socket.on('close', (data) => {
            socket.end()
            socket.destroy()
            socket.pipe(socket)
          })
        }
      }
    })
  }
}
