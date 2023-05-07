import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as path from 'path'

import { EmailTemplate, EmailVariables } from './send-email'


const getMjmlTemplate = <T extends EmailTemplate>(template: T, variables: EmailVariables<T>) => {
  const templateFile = path.join(__dirname, `../notifications/${template}.mjml`)
  const templateContent = fs.readFileSync(templateFile, 'utf8')

  const compiledTemplate = Handlebars.compile(templateContent.toString())(variables)

  return compiledTemplate
}

export default getMjmlTemplate