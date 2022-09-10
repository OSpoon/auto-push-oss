# auto-push-oss

自动推动目录到 OSS

## Inputs

|参数|描述|
|----|----|
|`root`|待推送路径|
|`bucket`|oss bucket|
|`region`|oss region|
|`accessKeyId`|oss accessKeyId|
|`accessKeySecret`|oss accessKeySecret|

## Example usage

```yaml
uses: OSpoon/auto-push-oss@master
with:
  root: ./public
  bucket: it200
  region: oss-cn-beijing
  accessKeyId: ${{secrets.accessKeyId}}
  accessKeySecret: ${{secrets.accessKeySecret}}
```