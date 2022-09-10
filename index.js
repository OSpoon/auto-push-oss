const path = require("path");
const fs = require("fs");

const core = require("@actions/core");
const OSS = require("ali-oss");

// 接收输入参数
const root = core.getInput("root");
const bucket = core.getInput("bucket");
const region = core.getInput("region");
const accessKeyId = core.getInput("accessKeyId");
const accessKeySecret = core.getInput("accessKeySecret");

const client = new OSS({
  bucket,
  region,
  accessKeyId,
  accessKeySecret,
});

const rootPath = root || "dist";

const isHave = fs.existsSync(rootPath);
if (!isHave) {
  throw new Error("路劲不存在");
}

let filepaths = [];
let putCount = 0;

function readFileSync(filepath) {
  let files = fs.readdirSync(filepath);
  files.forEach((filename) => {
    let p = path.join(filepath, filename);
    let stats = fs.statSync(p);
    if (stats.isFile()) {
      filepaths.push(p);
    } else if (stats.isDirectory()) {
      readFileSync(p);
    }
  });
}

function put(filepath) {
  const p = filepath.replace(rootPath, "").substr(1);
  return client.put(p.replace("\\", "/"), filepath);
}

async function update() {
  try {
    // 递归获取所有待上传文件路径
    readFileSync(rootPath);
    let retAll = await filepaths.map((filepath) => {
      putCount++;
      console.log(`任务添加: ${path.basename(filepath)}`);
      return put(filepath);
    });
    Promise.all(retAll).then((res) => {
      const resAll = res.map((r) => {
        return r.res.statusCode === 200;
      });
      if (Object.keys(resAll).length === putCount) {
        console.log("发布成功");
      }
    });
  } catch (e) {
    console.log(e);
  }
}

// 上传发布
update();
