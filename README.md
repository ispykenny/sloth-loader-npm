# sloth-loader 🦥
 Lazy loader Vue Component with intersection observer
 [Example here](https://sloth-loader.netlify.app/)

## Installation
`yarn add sloth-loader`
`npm i sloth-loader`

## import component
```
import Slothloader from 'sloth-loader/index.vue';
```
## use in component
```
<Slothloader
  :width=1000
  :height=1000
  :omitAspect=false
  :src=src
  :loadWhen=0.2
  loadedClass="loaded"
  alt="Loaded image"
/>
```

# Component Props

### src 
###### Prop type: String
###### Required: true
value of image source

### omitAspect 
###### Prop type: String
###### Required: false
Use this to avoid maintaining the set or default aspect ratio of your image if you dont want to define an aspect ratio for your image with the height/width props.

### width 
###### Prop type: Number
###### Required: false
If using width, then the height prop is also required to generate an aspect ratio for the image parent.

### height 
###### Prop type: Number
###### Required: false
If using height, then the width prop is also required to generate an aspect ratio for the image parent.

### loadWhen 
###### Prop type: Number
###### Required: false
Load when is the value in which your image becomes fetched. So if using the value 0.2 then your image will begin to be fetched when it is 20% visible. You can use a value between 0 - 1.0. Leaving this blank will default to 0.5

### alt 
###### Prop type: String
###### Required: true
Alt tag for image for accessibility