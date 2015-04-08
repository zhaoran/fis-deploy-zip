# fis-deploy-zip

## 说明

将FIS产出进行zip打包 **仅支持FIS 1.8.5+**

## 使用方法

安装

```bash
npm i fis-deploy-zip -g
```

启用

```javascript
fis.config.set('modules.deploy', ['default', 'zip'])
```

配置

```javascript
fis.config.set('settings.deploy.zip', {
    publish : {
        from : '/',
        to: '/',
        file: './output/output.zip'
    }
});
```

发布

```bash
fis release -Dompd publish
```
