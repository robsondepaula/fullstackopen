#!/bin/bash
numParams=$#;

cd ../../part4/blog-list/

if [ "$numParams" -eq "0" ]; then
    npm run dev
else
    npm run start:test
fi