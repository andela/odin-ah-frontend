export const APIKEY = 'w4315vlk27hjiaqiovm56lybjmj8ntec0ywzgo58gfmaugsf';
// odin-ah-frontend-staging.herokuapp.com

export const initTitleInput = {
  name: 'title-input',
  inline: true,
  resize: false,
  menubar: false,
  theme: 'inlite',
  selection_toolbar: '',
  insert_toolbar: '',
  content_css: 'css/content.css'
};
export const initBodyInput = {
  inline: true,
  menubar: false,
  theme: 'inlite',
  mobile: {
    theme: 'mobile'
  },
  selection_toolbar: 'image | undo redo | bold italic | underline strikethrough | h2 h3 | quicklink | aligncenter',
  insert_toolbar: 'image',
  file_picker_types: 'image',
  image_dimensions: false,
  image_description: false,
  images_reuse_filename: true,
  content_css: 'css/content.css',
  plugins: [
    'autolink',
    'link',
    'linkchecker',
    'mediaembed',
    'textcolor',
    'image',
    'imagetools',
    'wordcount'
  ],
};
