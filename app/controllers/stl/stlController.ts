import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import MultipartFile from '@adonisjs/bodyparser'
import { FILE_UPLOAD_DIRECTORY } from '../../utils/consts.js'
import CreateFileHistoryPayload from '#interfaces/fileHistory/createFileHistoryPayload'
import FileHistoryService from '#services/fileHistoryService'
import User from '#models/user/user'
import { inject } from '@adonisjs/core'

@inject()
export default class StlController {  
  constructor(private fileHistoryService: FileHistoryService) {}

  /**
   * @uploadOne
   * @description Upload a single STL file and store it in the storage/uploads directory
   * @responseBody 200 - { "message": "Fichier uploadé avec succès." }
   * @responseBody 400 - { "errors": [ { "message": "The file must be a STL file" } ] }
   * @requestFormDataBody {"stlFile":{"type":"File","format":"stl","description":"The STL file to upload"}}
   */
  async uploadOne({ auth, request, response }: HttpContext) {
    const file: MultipartFile = request.file('stlFile')

    if (!file) {
      return response.status(400).send({
        errors: [
          {
            message: 'No file uploaded'
          }
        ]
      })
    }

    // Type verification
    if (file.extname && file.extname !== 'stl') {
      return response.status(400).send({
        errors: [
          {
            message: 'The file must be a STL file'
          }
        ]
      })
    }

    // Alternative type verification
    const extension = file.clientName.split('.').pop()?.toLocaleLowerCase()
    if (extension !== 'stl') {
      return response.status(400).send({
        errors: [
          {
            message: 'The file must be a STL file'
          }
        ]
      })
    }

    const user: User = auth.getUserOrFail()

    // Creating file history
    const fileServerName: string = `${cuid()}.stl`;
    const fileHistoryPayload: CreateFileHistoryPayload = {
      fileOriginalName: file.clientName,
      fileServerName: fileServerName,
      userId: user.id
    }

    await file.move(app.makePath(FILE_UPLOAD_DIRECTORY), {
      name: fileServerName
    })

    // File history creation
    await this.fileHistoryService.createHistory(fileHistoryPayload)

    return response.ok({ message: 'Fichier uploadé avec succès.' })
  }

  /**
   * @uploadMany
   * @description Upload multiple STL files and store them in the storage/uploads directory
   * @responseBody 200 - { "message": "Tout les fichiers uploadés avec succès." }
   * @responseBody 400 - { "errors": [ { "message": "No file uploaded" } ] } 
   */
  async uploadMany({ auth, request, response }: HttpContext) {
    const files: MultipartFile[] = request.files('stlFiles', {
      extnames: ['stl'],
    })

    if (files.length === 0) {
      return response.status(400).send({
        errors: [
          {
            message: 'No file uploaded'
          }
        ]
      })
    }

    for (let file of files) {
      // Type verification
      if (file.extname && file.extname !== 'stl') {
        return response.status(400).send({
          errors: [
            {
              message: `The file ${file.clientName} must be a STL file`
            }
          ]
        })
      }

      // Alternative type verification
      const extension = file.clientName.split('.').pop()?.toLocaleLowerCase()
      if (extension !== 'stl') {
        return response.status(400).send({
          errors: [
            {
              message: `The file ${file.clientName} must be a STL file`
            }
          ]
        })
      }
    }

    const user: User = auth.getUserOrFail()

    // Files storage
    for (let file of files) {
      // Creating file history
      const fileServerName: string = `${cuid()}.stl`;
      const fileHistoryPayload: CreateFileHistoryPayload = {
        fileOriginalName: file.clientName,
        fileServerName: fileServerName,
        userId: user.id
      }

      await file.move(app.makePath(FILE_UPLOAD_DIRECTORY), {
        name: fileServerName
      })

      await this.fileHistoryService.createHistory(fileHistoryPayload)
    }

    return response.ok({ message: 'Tout les fichiers uploadés avec succès.' })
  }

  async clearFiles({ request, response }: HttpContext) {
    return response.ok({ message: 'Tout les fichiers uploadés avec succès.' })
  }


}
