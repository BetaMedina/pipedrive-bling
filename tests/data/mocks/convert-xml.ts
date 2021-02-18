import { IXmlAdapter } from '../../../src/data/contracts/adapters/xml/xml-adapter'

export class XmlValidatorStub implements IXmlAdapter {
  result:String
  async convertToXml (payload:any):Promise<any> {
    this.result = '<validXml>Xml</validXml>'
    return this.result
  }
}
