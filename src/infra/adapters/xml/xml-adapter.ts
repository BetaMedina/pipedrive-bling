import { toXML } from 'jstoxml'
import { IXmlAdapter } from '../../../data/contracts/adapters/xml/xml-adapter'

export class XmlAdapter implements IXmlAdapter {
  async convertToXml (payload:any):Promise<any> {
    return toXML(payload)
  }
}
