# Bootstrap Performance Increase
In order to understand the importance of pageload, I received an example of a website with a tedious load time on mobile devices. Even with a decent internet connection the page still took quite some time to load. I received the website of Bootstrap (http://getbootstrap.com).

It was my task to improve the load time of this website, by implementing different principles to reduce load time, and eventually comparing the difference with the original site I started with.

The following features were added separately, and combined later as a whole, improved new website for Bootstrap. So please don't be surprised if you see the load time increase on the next added feature.

Everything is tested on a Regular 3G connection (100ms, 750kb/s, 250kb/s).

### Initial load time
With not a single improvement added yet, the page is fully loaded in a whopping 24.5 seconds. Users will not be able to browse the current state of this website with ease, and might drop out entirely. Time to do somehting about that!

![Initial](https://berendpronk.github.io/minor/assets/pm/initial.png)

### Reducing file size of images
The first thing I thought about, was recuding the size of the images on the website. Just because images are the largest files for the user to download.  
By using Adobe Photoshop, I saved the images specifically for the web, on the smallest possible resolution.

This simple implementation already reduced the download size of the page by half (618kb), and the load time was reduced by `71%`.

![Images](https://berendpronk.github.io/minor/assets/pm/reduce-image-sizes.png)

### Implementing a Fontface Observer
This addition prevents the user's browser to immediately request to download the webfonts from the server, and replaces the font with a temporary fallback font. Meaning that the user will see a similar font, before they are presented with the intended font of the website.  
When the font is done loading in the background, it will replace the fallback font entirely.

The fontface observer does not reduce much of the download size of the webpage, but it does reduce the load time by `47%`.

![Fontface Observer](https://berendpronk.github.io/minor/assets/pm/fontface-observer.png)

### Asynchronous loading of CSS files
The page uses a lot of CSS to render the grid and features contained within the Bootstrap library. By not changing anything about this, the browser will download the CSS immediately, blocking the load of everything important for the user to see.

A lot of the CSS contained in the stylesheets is not used on the page itself, but the unused styling will still be loaded in if nothing is added to prevent this. By defining the critical CSS for the specific page, we only load what the user needs to see. This removes the FOUC (Flash Of Unstyled Content).  
The rest of the CSS will be loaded in asynchronously by adding a JavaScript function that takes care of this all.

Besides a asynchronous loading, I also bundled the CSS in a single file, reducing the amount of requests the browser needs to make.

The total download size will obviously not be reduced, since all the files will be downloaded eventually, in the end. The load time, however, will be reduced by `41%`, with the addition of asynchronous stylesheets.

![Critical CSS](https://berendpronk.github.io/minor/assets/pm/critical-css.png)

### Bundling of JavaScript files
The JavaScript the site uses really adds up on the load time, because the browsers needs to make a request to the server for multiple files. Bundling every script together, and minifying the whole, reduces the request-count to 16, instead of the initial 19.

After the bundling, I set the request in the `<head>` of the document with a `defer` attribute. This means that the JavaScript will be requested after all the HTML is loaded.

The addition of this feature takes care of the amount of requests, not of the amount of bytes the eventual page consists of. The load time of the site is reduced by `44%`, though.

![JavaScript Bundle](https://berendpronk.github.io/minor/assets/pm/javascript-bundle.png)

### Server-side compression
This feature is an addition to the bundling of JavaScript and CSS files. It compresses the files even more, server-side, which means that the user has to download smaller files, with the same outcome.

I've set gzip as the method to compress the files server-side, which reduces the download size of the page by `33%` and the load time by `60%`.

![Compression](https://berendpronk.github.io/minor/assets/pm/server-side-compression.png)

### Adding everything together - Final load time
Now is the time to implement every single feature to the website we started out with, resolving a few merge conflicts along the way. The result speaks for itself. The load time is reduced by `88%` in total, proving that webpages can be loaded much faster with the addition of a few features.

![Final](https://berendpronk.github.io/minor/assets/pm/final.png)
