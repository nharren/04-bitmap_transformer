![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 04: Bitmap Transformer
===

## To Submit this Assignment
* have team leader fork this repository
* have team leader add team members as collaborators to the team fork
* team members should clone team fork
* write all of your code in a directory name `bitmap-` + `<team name>` **e.g.** `bitmap-weasels`
* submit a pull request to this repository when done
* each person will submit a link to their own PR in canvas
* each person write a question and observation on canvas

## Learning Objectives  
* students will be able to manipulate binary data using the node.js `Buffer` class
* students will be able to architect modular solutions to solving problems

## Resources  
* [Bitmap Specification](https://en.wikipedia.org/wiki/BMP_file_format)
* [NodeJS Buffer docs](https://nodejs.org/api/buffer.html)

#### Feature Tasks

For this assignment you will be building a bitmap (`.bmp`) reader and transformer. It will read a bitmap in from disk, run one or more color transforms on the bitmap and then write it out to a new file. This project will require the use of node buffers in order to manipulate binary data. Your project should include tests, as well as a `package.json`, `.eslintrc`, `README.md`, and a `.gitignore`. Make sure to run all your code through eslint. The process will look something like this:

1. open the original bitmap file using fs and read it into a buffer
2. convert the buffer header data into a Javascript Object (using constructors)
3. run a transform on the buffer directly
4. write the buffer to a new file

The wikipedia article found here [Bitmap Specification](https://en.wikipedia.org/wiki/BMP_file_format) describes the byte specification of a "windows bitmap file." We'll be working with the simplest version, meaning no compression.

* your project should have three ***(or more)*** transforms
* invert the colors (***hint:*** subtract every color value from the max color value which is 255),
* grayscale the colors (***hint:*** multiply each color value by a constant, just make sure your values don't go over 255)
* (red|green|blue)scale the colors (***hint:*** same as above but only multiply one of the colors)

#### Bonus:
* ability to handle various sized bitmap
* ability to handle LE and BE computers with a single if statement
* utilizes a command line interface (CLI)
* CLI can select the transforms

#### Suggested Directory Structure (this is optional):
* suggested directory structure:
  - **index.js**
  - **lib**
    - bitmap file helper
  - **model**
    - bitmap constructor
    - color constructor
  - **test**
    - bitmap file helper test
    - bitmap constructor test
    - color constructor test

#### Rubric:
* **tests:** 3pts
* **package.json:** 2pts
* **read bitmap meta data:** 5pts
* **successfully apply transforms:** 5pts
* **project design and organization:** 5pts
