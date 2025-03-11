import puppeteer from 'puppeteer'
import Material from '#models/material/material'
import Printer from '#models/printer/printer'
import { env } from 'node:process'

interface QuoteData {
    printerId: string
    materialId: string
    totalMaterialCost: number
    printTime: string
    electricityCost: number
    cleaningCost: number
    totalCost: number
    material: Material
    printer: Printer
    filename?: string
}

export default class QuoteService {

  async generatePdf(quoteDatas: QuoteData[]): Promise<Buffer> {

    const now = new Date();

    const date = now.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })


  const formattedDate =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0') +
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0');

    const totalCost = quoteDatas.reduce((sum, data) => sum + data.totalCost, 0)

    let browser;
    if(env.NODE_ENV === 'production') {
      browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox'],
      });
    }
    else {
      browser = await puppeteer.launch();
    }

    const page = await browser.newPage()

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Devis N°${formattedDate}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
          }
          .container {
            width: 80%;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header,
          .footer {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
          }
          .details,
          .summary {
            margin-bottom: 20px;
          }
          .details table,
          .summary table {
            width: 100%;
            border-collapse: collapse;
          }
          .details th,
          .details td,
          .summary th,
          .summary td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          .summary th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Devis N°${formattedDate}</h1>
            <p>JUNIA / Fablab</p>
            <p><a href="https://www.junia.com/">www.junia.com</a></p>
          </div>

          <div class="details">
            <p>13 rue de Toul, 59046 Lille</p>
            <p>Tél : 03.28.38.48.58</p>
          </div>


          ${quoteDatas.map(data => `
          <div class="summary">
            <h3>Pièce : ${data.filename}</h3>
            <p>Imprimante : ${data.printer.name}</p>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantité</th>
                  <th>Unité</th>
                  <th>Prix unitaire HT</th>
                  <th>Prix total HT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${data.material.name}</td> <!-- Matériau -->
                  <td>${(data.totalMaterialCost / data.material.grammePrize).toFixed(2)}</td> <!-- Quantité -->
                  <td>g</td>
                  <td>${(data.material.grammePrize).toFixed(2)} €</td> <!-- Prix unitaire HT -->
                  <td>${data.totalMaterialCost.toFixed(2)} €</td> <!-- Prix total HT -->
                </tr>
                <tr>
                  <td>Estimation temps d'impression</td>
                  <td>${data.printTime}</td> <!-- Quantité -->
                  <td>h</td>
                  <td>${data.printer.impressingCost.toFixed(2)} €</td> <!-- Prix unitaire HT -->
                  <td>${data.electricityCost.toFixed(2)} €</td> <!-- Prix total HT -->
                </tr>
                <tr>
                  <td>Préparation et post-traitement</td>
                  <td>1</td>
                  <td>-</td>
                  <td>${data.cleaningCost.toFixed(2)} €</td>
                  <td>${data.cleaningCost.toFixed(2)} €</td>
                </tr>
              </tbody>
            </table>
          </div>
          `).join('')}

          <div class="summary">
            <h3>Résumé</h3>
            <table>
              <tbody>
                <tr>
                  <th>Total HT</th>
                  <td>${totalCost.toFixed(2)} €</td>
                </tr>
                <tr>
                  <th>TVA (20%)</th>
                  <td>${(totalCost * 0.20).toFixed(2)} €</td>
                </tr>
                <tr>
                  <th>Total TTC</th>
                  <td>${(totalCost + totalCost * 0.20).toFixed(2)} €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>Date du devis : ${date}</p>
          </div>
        </div>
      </body>
      </html>
    `

    await page.setContent(htmlContent)
    const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4' }))

    await browser.close()

    return pdfBuffer
  }
}
