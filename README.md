### Hack4City Team Carrots dev repo. [![Travis Build Status](https://travis-ci.com/edencakir/Hack4City.svg?token=WBPeUpiA2h1hB2CioaZp&branch=master)](https://travis-ci.com/edencakir/Hack4City.svg?token=WBPeUpiA2h1hB2CioaZp&branch=master)
:space_invader:
[Rick and Morty final episode turkish sub](http://dizipub.com/rick-and-morty-3-sezon-10-bolum-sezon-finali/2)

Endpoint base URL: [http://54.163.77.75:8080](http://54.163.77.75:8080)

**© 2017 IZKA & Yasar University.  All rights reserved.**

## Installing React Native App

### Prerequsites
- [yarn](https://yarnpkg.com/lang/en/docs/install/)
- [watchman](https://facebook.github.io/watchman/docs/install.html)
- react-native-cli
    - `yarn global add react-native-cli`

### Instructions
1. Run `yarn install`
2. Run `react-native link`
3. Add `sdk` to `local.properties`

## Debugging:
- Install [react-native-debugger](https://github.com/jhen0409/react-native-debugger/releases)
- Run `yarn debug`
- Shake the device and tap `Debug JS Remotely`

## Using API


### /getDuraks
Parametre olarak durak isimlerini alir ve secilen duraktaki kisi sayisini doner.

###### Request
```
{
    "token": "{{token}}",
    "stationID": "0aB1cD2eF3g"
}
```

###### Response
```
{
   result: 'success',
   response: {
     message: 'Durak fetch success',
     data: docs
   }
}
```

### /deleteAllDuraks
Parametre olarak durak ismini alir ve secilen duragi siler.

###### Request
```
{
    "token": "{{token}}",
    "stationID": "0aB1cD2eF3g"
}
```

###### Response
```
{
    result: 'success',
    response: {
      message: 'Cleared everything.'
    }
}
```

### /addDurak
Parametre olarak durak ismini alir ve bu ismi duraklar listesine ekler. Ayni durak ismi eklendiginde mevcut olan durak bilgileri guncellenir.

###### Request
```
{
    "token": "{{token}}",
    "stationID": "0aB1cD2eF3g"
}
```

###### Response
```
{
      result: 'success',
      response: {
        message: 'Initial durak created, user set to 1.'
      }
}
```


