# Instagram Clone

## By: Kurt Reynolds

## UPDATEDS 3.27.22

- updated to v1.2
  - added new header logo
  - updated style to stories component
  - fixded the like feature to function properly
  - started working on refactoring code

## UPDATED NOTES:

- Code needs to be refactored to meet DRY principles. As of right now the code works, but it is repeated.
- Instructions below were for the preliminary build. Code has since been restructured. Will update instructions in the future.

## Part 1

Build HomeScreen & Header

- Create folders for screens, components
- Add styling to the Header and import images for logos and icons
- Header:
  - Use plus, like, and message icons from icons8.com
  - Create unread badge and add styling

## Part 2

Build Stories component

- Start with creating "dummy data" and store in the data folder for profile images and user names
- Use ScrollView with horizontal parameter to be able to scroll through users
- Map over dummy data and return a View with index set as key. Inside the View component, render the Image and then a Text component. Use ternary operator to set the max username length before adding elipses to end of username.
- Add styles to the component

## Part 3

Build Post component

- Create more "dummy data" for images, likes, user, captions, and comments
- There are \_\_ parts to the Post component:

## Part 4

Build BottomTabs component

- next

## Part 5

Build New Post component

- Create new screen: NewPostScreen in screens folder
- Create a new subfolder in components folder called: newPost
- In newPost folder, create a new component called: AddNewPost and FormicPostUploader
- Install dependencies: yarn add formik & yarn add yup

## Part 6

Build Navigation

- Create new screen: navigation
- Install: @react-native-navigation/native, @react-navigation/stack, react-native-gesture-handler, valid-url

## Part 7

Build Login

- Create new screen: LoginScreen in screens folder
- Create new component in new subfolder: LoginForm in components/loginScreen
- Install: email-validator

## Part 8

Build Signup

- Create new screen: SignupScreen in screens folder
- Create new component in new subfolder: SignupForm in components/signupScreen

## Part 9

Setup the backend with Firebase

- expo install firebase@8.2.3

## Part 10

Segment navigation between signed in and signed out

- Add

## Part 11

Add signout

- Add the signout method in Header component

## Part 12

Put posts on HomeScreen

## Part 13

Add camera feature

- Install: expo install expo-camera
- Install: expo install expo-image-picker
- Create new subfolder in components folder called features and create new files called CameraComponent and CameraGallery
