# resizeimage by Sharp
AWS Lambda image resize by Sharp in Node.js 6.10

## Description
Dynamic image resize program for AWS Lambda by using Sharp in Node.js 6.10.
It's easy to use. This node module id built from source beforehand. So no need to compile.

## Requirement
AWS Lambda Node 6.10

## How to use
1. Make your package from this repo.
```
$ git clone git@github.com:hardreggaecafe/resizeimage_sharp.git
$ cd resizeimage_sharp
$ vim index.js # Add some modification if necessary
$ zip -r image_resize.zip index.js node_modules
```
2. Unload package via AWS Lambda

## Author
Noriaki Takamizawa