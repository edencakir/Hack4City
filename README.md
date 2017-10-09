# Hack4City Hackathon - Team Carrots [![Travis Build Status](https://travis-ci.com/edencakir/Hack4City.svg?token=WBPeUpiA2h1hB2CioaZp&branch=master)](https://travis-ci.com/edencakir/Hack4City.svg?token=WBPeUpiA2h1hB2CioaZp&branch=master)

Endpoint base URL: [http://54.163.77.75:8080](http://54.163.77.75:8080) :space_invader:

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

Takes a station name as a parameter and then returns user count.


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
Takes a station name as a parameter and then deletes it.

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
Takes a station name as a parameter and then adds it to the station list. Increments user count.

###### Response
```
{
      result: 'success',
      response: {
        message: 'Initial durak created, user set to 1.'
      }
}
```


