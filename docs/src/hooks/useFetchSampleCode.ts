import { useEffect, useState } from 'react'
import axios from 'axios'
const BASE_URL = 'https://api.github.com/repos/voyagegroup/ingred-ui/contents/src/components'

const useFetchSampleCode = (path: string): string => {
  const [sampleCode, setSampleCode] = useState<string>('')
  useEffect(() => {
    axios.get(BASE_URL + path).then((res) => {
      const json_data = res.data
      const decode_data = atob(json_data.content)
      const before = '<Story name="Example">'
      const after = '</Story>'
      // decode_dataの中のbeforeを前から検索
      const beforeIdx = decode_data.indexOf(before)
      // decode_dataの中のafterを後ろから検索
      const afterIdx = decode_data.lastIndexOf(after)
      if (beforeIdx >= 0 && afterIdx >= 0) {
        const result = decode_data.substring(beforeIdx + before.length, afterIdx)
        setSampleCode(result)
      }
    })
  }, [])
  return sampleCode
}
export default useFetchSampleCode
