import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { MultipartFile } from '@adonisjs/bodyparser'

export default class StlController {
  /**
   * @uploadOne
   * @description Upload a single STL file and store it in the storage/uploads directory
   * @responseBody 200 - { "message": "Fichier uploadé avec succès." }
   * @responseBody 400 - { "errors": [ { "message": "The file must be a STL file" } ] }
   * @requestFormDataBody {"stlFile":{"type":"File","format":"stl","description":"The STL file to upload"}}
   */
  async uploadOne({ request, response }: HttpContext) {
    const file: MultipartFile | null = request.file('stlFile')

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

    await file.move(app.makePath('storage/uploads'), {
      name: `${cuid()}.stl`
    })

    return response.ok({ message: 'Fichier uploadé avec succès.' })
  }

  /**
   * @uploadMany
   * @description Upload multiple STL files and store them in the storage/uploads directory
   * @responseBody 200 - { "message": "Tout les fichiers uploadés avec succès." }
   * @responseBody 400 - { "errors": [ { "message": "No file uploaded" } ] }
   */
  async uploadMany({ request, response }: HttpContext) {
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

    // Files storage
    for (let file of files) {
      await file.move(app.makePath('storage/uploads'), {
        name: `${cuid()}.stl`
      })
    }

    return response.ok({ message: 'Tout les fichiers uploadés avec succès.' })
  }

  async clearFiles({ response }: HttpContext) {
    return response.ok({ message: 'Tout les fichiers uploadés avec succès.' })
  }
}
