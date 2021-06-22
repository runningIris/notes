### gradle 代理的问题

`~/.gradle/gradle.properties`

需要配置好 gradle 代理，否则会打包不成功

```
systemProp.http.proxyHost=
systemProp.http.proxyPort=
systemProp.https.proxyHost=
systemProp.https.proxyPort=
```
