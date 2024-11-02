// Commented out to avoid repetition




// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from "dotenv";
// dotenv.config();
// import { Readable } from 'stream';


// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Helper function to upload a buffer to Cloudinary
// export async function uploadFile(buffer, options = {}) {

//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      
//       if (error) {
//         console.error('Error uploading to Cloudinary:', error);
//         return reject(error);
//       }

//       console.log(`cloudinary uploadstream -->`, uploadStream)
//       // console.log('Upload successful:', result);
//       resolve(result);
//     });

//     // Create a readable stream from the buffer and pipe it to Cloudinary
//     const stream = Readable.from(buffer);
//     stream.pipe(uploadStream);

//   });
// }
