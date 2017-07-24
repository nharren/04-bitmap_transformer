# Bitmap Transformer

This project contains five modules which facilitate the transformation of bitmap files:

* **Color**: Handles color calcuations, parsing, and stringifying.
* **Color Transforms**: Attaches various color transformations to the Color prototype.
* **Bitmap**: Handles parsing of bitmap files.
* **Bitmap Transformer**: Exposes methods for manipulating bitmaps.
* **Bitmap Transforms**: Attaches various bitmap transformations to the Bitmap prototype.

The available transformations are:
* Black and White
* Grayscale
* Sepia
* Horizontal Flip
* Vertical Flip
* Color Inversion
* Clockwise Rotation
* Counterclockwise Rotation
* Hue Shift
* Lightness Shift
* Saturation Shift
* Redness Shift
* Greenness Shift
* Blueness Shift

## CLI

To use the CLI, type `node index.js [filename] [transformation[:parameter]] [transformation[:parameter]] [transformation[:parameter]]` etc.

The transformation arguments are:
* `bw` -- Black and White
* `gray` -- Grayscale
* `sepia` -- Sepia
* `hflip` -- Horizontal Flip
* `vflip` -- Vertical Flip
* `invert` -- Color Inversion
* `rotc` -- Clockwise Rotation
* `rotcc` -- Counterclockwise Rotation
* `hshift:degree` -- Hue Shift
* `lshift:percentage` -- Lightness Shift
* `sshift:percentage` -- Saturation Shift
* `rshift:magnitude` -- Redness Shift
* `gshift:magnitude` -- Greenness Shift
* `bshift:magnitude` -- Blueness Shift

The output will be located at `./output/custom.bmp`.

Running the cli without arguments will produce a sample of all transformations.
