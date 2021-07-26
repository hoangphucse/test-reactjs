import "draft-js/dist/Draft.css";
import ImageUploader from "quill-image-uploader";
import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

Quill.register("modules/imageUploader", ImageUploader);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"], // remove formatting button
];

var quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: "snow",
});

function MyEditor(props) {
  const [editorValue, setEditorValue] = useState("");
  const [src, setSrc] = useState("");
  let quillObj;

  const handleChange = (content, delta, source, editor) => {
    console.log("html: ", content);
    console.log("delta: ", delta);
    console.log("source: ", source);
    console.log("editor: ", editor.getContents());

    const images = getImgUrls(editor.getContents());
    console.log("images: ", images);
  };

  function getImgUrls(delta) {
    if (!delta) return;
    return delta.ops
      .filter((i) => i.insert && i.insert.image)
      .map((i) => i.insert.image);
  }
  const apiPostNewsImage = () => {};

  return (
    <div>
      <img src={src} />

      <ReactQuill
        ref={(el) => {
          quillObj = el;
        }}
        value={editorValue}
        modules={{
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"], // remove formatting button
            ],
            // handlers: {
            //   image: imageHandler,
            // },
          },
          imageUploader: {
            upload: (file) => {
              return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("image", file);

                fetch(
                  "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
                  {
                    method: "POST",
                    body: formData,
                  }
                )
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result);
                    resolve(result.data.url);
                  })
                  .catch((error) => {
                    reject("Upload failed");
                    console.error("Error:", error);
                  });
              });
            },
          },
        }}
        placeholder="Add a description of your event"
        onChange={(content, delta, source, editor) =>
          handleChange(content, delta, source, editor)
        }
        id="editor"
      />
    </div>
  );
}

// const imageHandler = async () => {
//   const quillEditor = quillObj.getEditor();
//   const input = document.createElement("input");

//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "image/*");
//   input.click();

//   input.onchange = async () => {
//     const file = input.files[0];

//     const formData = new FormData();

//     // Save current cursor state
//     const range = quillEditor.getSelection();

//     // Insert temporary loading placeholder image
//     quillEditor.insertEmbed(range.index, "image", URL.createObjectURL(file));

//     // Move cursor to right side of image (easier to continue typing)
//     quillEditor.setSelection(range.index + 1);

//     const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

//     // Remove placeholder image
//     quillEditor.deleteText(range.index, 1);

//     // Insert uploaded image
//     // this.quill.insertEmbed(range.index, 'image', res.body.image);
//     quillEditor.insertEmbed(
//       range.index,
//       "image",
//       "https://anhdep123.com/wp-content/uploads/2020/05/cho-con.jpg"
//     );
//   };
// };
export default MyEditor;
