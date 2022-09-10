# auto-push-oss

方便将常见的 Vue 项目,VuePress 项目构建到根目录的 dist 文件夹推送到指定从 oss 桶的根目录,特别适合在 oss 托管 VuePress 博客~

## Inputs

|参数|描述|
|----|----|
|`root`|待推送文件夹|
|`bucket`|oss bucket|
|`region`|oss region|
|`accessKeyId`|oss accessKeyId|
|`accessKeySecret`|oss accessKeySecret|

## Example usage

```yaml
uses: OSpoon/auto-push-oss@main
with:
  root: public
  bucket: it200
  region: oss-cn-beijing
  accessKeyId: ${{secrets.accessKeyId}}
  accessKeySecret: ${{secrets.accessKeySecret}}
```