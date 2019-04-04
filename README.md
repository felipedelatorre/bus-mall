# BusMall Project - ClickTracker

## To do:
1. ~~Create a new repo for this weekly project called bus-mall at the root level of your ~/CF/201 directory.~~
2. ~~Scaffold your repo with the usual README, CSS, JS, and HTML files, plus a img/ directory.~~
3. ~~Include in your repository a .eslintrc.json file whose contents are copied from the eslintrc.json file in the class repository.~~
4. ~~Retrieve the assets from the assets/ directory and place them in your image directory.~~
5. ~~Write your user stories as described above and place them in a file called user_stories.md in your repo. Utilize good Markdown style to make this document look nice.~~
6. ~~The thing you want to build today will select three random photos from the image directory and display them side-by-side-by-side in the browser window.~~
7. In addition, you'll want to be able to receive clicks on those displayed images, and track those clicks for each image. You'll also want to track how many times each image is displayed, for statistical purposes.
8. Upon receiving a click, three new non-duplicating random images need to be automatically displayed. In other words, the three images that are displayed should contain no duplicates, nor should they duplicate with any images that we displayed immediately before.
9. To do this, you'll want a constructor function that creates an object associated with each image, and has (at a minimum) properties for the name of the image (to be used for display purposes), its filepath, the number of times it has been shown, and the number of times it has been clicked. You'll probably find it useful to create a property that contains a text string you can use as an ID in HTML.
10. After 25 selections have been made, turn off the event listeners on the images (to prevent additional voting) and also display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer".


## Problems
1. Only takes .jpg files
2. Some images display out of the box
3. Ranking and list has not been started
4. Chart needs to be implemented
5. Save States needs to be implemented