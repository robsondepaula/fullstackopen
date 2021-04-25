#!/bin/bash

usage() {
  echo "Convenience script to apply lesson rules after creating the React app."
  echo "Sample usage:"
  echo ""
  echo -e "\t$(basename $0) part1/unicafe"
  echo ""
  echo "Caution:"
  echo "The script will reset index.js and App.js files to course template."
  echo "It will also remove App.css, App.test.js, logo.svg, setupeTests.js and reportWebVitals.js"
  exit
}

numParams=$#;

if [ "$numParams" -eq "0" ]; then
 usage
fi

if [ -d "$1" ]; then
    filePath=$1/src/index.js
    if [ -f $filePath ]; then   
        echo "import ReactDOM from 'react-dom'" > $filePath
        echo "import App from './App'" >> $filePath
        echo "" >> $filePath
        echo "ReactDOM.render(" >> $filePath
        echo "  <App />," >> $filePath
        echo "  document.getElementById('root')" >> $filePath
        echo ")" >> $filePath
    fi

    filePath=$1/src/App.js
    if [ -f $filePath ]; then
        echo "import React from 'react'" > $filePath
        echo "const App = () => (" >> $filePath
        echo "  <div>" >> $filePath
        echo "    <p>Hello world</p>" >> $filePath
        echo "  </div>" >> $filePath
        echo ")" >> $filePath
        echo "" >> $filePath
        echo "export default App" >> $filePath
    fi

    arr=($1/src/App.css $1/src/App.test.js $1/src/logo.svg $1/src/setupTests.js $1/src/reportWebVitals.js $1/README.md)
    for i in "${arr[@]}"
    do
        if [ -f $i ]; then
            rm $i
        fi
    done

    echo "done"
else
    echo -e "path '$1' is invalid, please check it."
fi