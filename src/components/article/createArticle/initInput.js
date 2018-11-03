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
  selection_toolbar: 'image | bold italic | h2 h3 | alignleft aligncenter alignright alignfull',
  insert_toolbar: '',
  file_picker_types: 'image',
  images_reuse_filename: true,
  content_css: 'css/content.css',
  plugins: [
    'autolink',
    'link',
    'linkchecker',
    'lists',
    'mediaembed',
    'textcolor',
    'image',
    'wordcount'
  ]
};
