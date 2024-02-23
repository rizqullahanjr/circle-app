import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
  upload() {
    cloudinary.config({
      cloud_name: "dooresb8c",
      api_key: "836545233984292",
      api_secret: "Idy0wpHyjBOAHWWjHIOBK0me-DQ",
    });
  }

  async destination(image: any) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        "src/uploads/" + image
      );
      return cloudinaryResponse.secure_url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
})();
