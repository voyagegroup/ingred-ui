import { $ } from 'zx'
const glob = require('glob')
const commands = []
const files = glob.sync('../src/components/**/*.tsx')

files.map((file) => {
  if (file.match('tests') || file.match('index') || file.match('stories')) {
    return null
  } else {
    const before = 'src/components/'
    const after = '.tsx'
    // fileの中のbeforeを前から検索
    const beforeIdx = file.indexOf(before)
    // fileの中のafterを後ろから検索
    const afterIdx = file.lastIndexOf(after)
    if (beforeIdx >= 0 && afterIdx >= 0) {
      // 両方とも見つかったら中身を取り出す
      const result = file.substring(beforeIdx + before.length, afterIdx)
      const target_file = file
      const json_name = result
      commands.push({ target_file, json_name })
    }
  }
})

// ループで実行する処理
const callDocgenCli = (target_file, json_name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      $`npx react-docgen-typescript-cli ${target_file} -o ./src/docgen/${json_name}.json`
      resolve();
    }, 10000);
  });
}

// Promiseの直列処理をループで繰り返す
let myPromise = Promise.resolve();
for (let i = 0; i < commands.length; i++) {
  myPromise = myPromise.then(callDocgenCli.bind(this, commands[i].target_file, commands[i].json_name))
}
