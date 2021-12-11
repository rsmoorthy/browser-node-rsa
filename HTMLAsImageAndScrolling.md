## Synopsis

Do as per README.md

Then load the browser with localhost:4040/imagescroll.html (variation 1)
or localhost:4040/imagescroll2.html (variation 2)

## Overview

We would like to show arbitrary html as an image and then only show the parts
of the image as necessary. Then on scrolling, show the next part of the
image.

In this case, we would like to ensure that the DOM only has the selected
areas of the image and does not have the decrypted data anywhere in the DOM.
This means that no one can do inspect element and see the full image or the full
decrypted data.

This is accomplished by html2canvas, which can create an image snapshot of the
page or parts of the page. But we don't want to place the decrypted data (body of the email) in the DOM at all. And to achieve that, there is a nifty feature in html2canvas
called "onclone", which can clone an element on the DOM and within that function,
we can add more contents. Essentially a virtual DOM, that does not get showed up
in the DOM at any time.

## Variation - 1

Checkout the `imagescroll.html` (url: localhost:4040/imagescroll.html)

Checkout the function `paint` which accomplishes the above. In this case,
the decrypted data is used to create a new canvas everytime, according to the
size and position needed.

## Variation - 2

Checkout the `imagescroll2.html` (url: localhost:4040/imagescroll2.html)

Checkout the functions `getCanvas` `crop`, `paint` which accomplishes the above.
In this case, the decrypted data is used to create a new canvas only once. After
that, a new canvas is created based on the already created canvas to show the
parts of the  image
