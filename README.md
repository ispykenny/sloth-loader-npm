# sloth-loader  🦥
 Image Lazy loader Vue Component with intersection observer
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
<div class="container">
  <Slothloader
    :fadeIn=true
    :width=1000
    :height=1000
    :omitAspect=false
    :src=src
    alt="Loaded image"
  />
</div>
```

# Component Props

### src 
###### Prop type: String
###### Required: true
value of image source
### fadeIn 
###### Prop type: Boolean
###### Required: false
set prop to true if you want image to have a transitional fade-in on load.

### omitAspect 
###### Prop type: String
###### Required: false
Use this to avoid maintaining the set or default aspect ratio of your image if you dont want to define an aspect ratio for your image with the height/width props.

### width 
###### Prop type: Number
###### Required: false
If using width, then the height prop is also required to generate an aspect ratio for the image parent.
Though you're providing a width value, we never set the width of the image. This is used strictly to generate an apsect ratio ```padding-bottom: ${this.$props.height/this.$props.width * 100}%```

### height 
###### Prop type: Number
###### Required: false
If using height, then the width prop is also required to generate an aspect ratio for the image parent.
Though you're providing a height value, we never set the height of the image. This is used strictly to generate an apsect ratio ```padding-bottom: ${this.$props.height/this.$props.width * 100}%```

### loadWhen 
###### Prop type: Number
###### Required: false
Load when is the value in which your image becomes fetched. So if using the value 0.2 then your image will begin to be fetched when it is 20% visible. You can use a value between 0 - 1.0. Leaving this blank will default to 0.5

### alt 
###### Prop type: String
###### Required: true
Alt tag for image for accessibility