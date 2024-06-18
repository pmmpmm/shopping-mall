const uploadProductImg = async (files: FileList) => {
  if (files) {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_NAME);
    return fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: data
    }) //
      .then((res) => res.json())
      .then((data) => data.url);
  }
};

export default { uploadProductImg };
