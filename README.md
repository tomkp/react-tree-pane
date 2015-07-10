# React Tree Pane

Tree-Pane component built with [React](http://facebook.github.io/react)

[![Build Status](https://img.shields.io/travis/tomkp/react-tree-pane/master.svg?style=flat-square)](https://travis-ci.org/tomkp/react-tree-pane)
[![Coverage Status](https://img.shields.io/coveralls/tomkp/react-tree-pane/master.svg?style=flat-square)](https://coveralls.io/r/tomkp/react-tree-pane)

Check out the [demo](http://astonishing-dinosaurs.surge.sh/)


```
   npm install react-tree-pane
```


### Example

```js
   
   var model = {
       name: 'Default',
       children: [
           { name: 'react-tree-pane', children:[
               {name: 'demo', children: [
                   {name: 'bundle.js'},
                   {name: 'Example.js'}
               ]},
               {name: 'src', children: [
                   {name: 'TreePane.js'}
               ]},
               {name: 'test', children: [
                   {name: 'TreePane-test.js'}
               ]},
               {name: 'package.json'}
           ]}
       ]
   };
   
   
   var Example = React.createClass({
       render: function() {
           return <TreePane model={model} />
       }
   });
   
   
   React.render(<Example />, document.body);
```


